const axios = require('axios');
module.exports = cds.service.impl(async function () {
  const { Department, Teacher, Sequence, Student, TeacherDetails, MYSERVICE_STUDENT_DRAFTS, Files,AAuthorized } = this.entities;
  // Handle CREATE operation for Department



  // //build process api local generate token
  // nst response = await axios.post(tokenUrl, null, {
  //       params: {
  //         grant_type: 'client_credentials'
  //       },
  //       auth: {
  //         username: clientId,
  //         password: clientSecret
  //       }
  //     });

  //     const token = response.data.access_token;
  //     console.log('Generated Token:', token);
  //     return token;
  //   } catch (error) {
  //     console.error('async function generateToken() {
  //   const tokenUrl = 'https://a9929629trial.authentication.us10.hana.ondemand.com/oauth/token';
  //   const clientId = 'sb-56ddb77e-8855-41ae-92bc-17c9d4bf6789!b308793|xsuaa!b49390';
  //   const clientSecret = '2a6158bc-88d9-450b-9099-bce9b0fa24ac$HOXiEJqMgNTGNLIOr64rdESbu4zDQ6O7SYIIsN80uB4=';

  //   try {
  //     coError generating token:', error.response ? error.response.data : error.message);
  //   }
  // }

  // generateToken();




  this.before('CREATE', 'Department', async (req) => {
    // Trim and format department name
    const trimmedDepartmentName = req.data.DepartmentName.trim().toLowerCase();

    // Check if a department with the same name (case-insensitive) already exists
    const existingDepartment = await SELECT.one.from(Department)
      .where({ DepartmentName: { like: trimmedDepartmentName } });

    if (existingDepartment) {
      req.error(400, `The department name '${req.data.DepartmentName}' already exists with ID '${existingDepartment.DepartmentID}'.`);
    }

    // Get the current sequence value for DepartmentID
    let departmentSequence = await SELECT.one.from(Sequence).where({ Name: 'DepartmentID' });

    // If no sequence exists, initialize it
    if (!departmentSequence) {
      departmentSequence = { Name: 'DepartmentID', Value: 0 };
      await INSERT.into(Sequence).entries(departmentSequence);
    }

    // Generate new DepartmentID
    const newId = departmentSequence.Value + 1;
    req.data.DepartmentID = `D${newId}`;

    // Update the sequence value
    await UPDATE(Sequence).set({ Value: newId }).where({ Name: 'DepartmentID' });

    const tx = cds.transaction(req);

    // Handle StudentID generation if there are students in deptToStudent
    if (req.data.deptToStudent && Array.isArray(req.data.deptToStudent) && req.data.deptToStudent.length > 0) {
      // Get the current sequence value for StudentID
      let studentSequence = await SELECT.one.from(Sequence).where({ Name: 'StudentID' });

      // If no sequence exists, initialize it
      if (!studentSequence) {
        studentSequence = { Name: 'StudentID', Value: 0 };
        await INSERT.into(Sequence).entries(studentSequence);
      }

      // Process each student
      for (const student of req.data.deptToStudent) {
        if (student.StudentID) {
          // Check if StudentID already exists in Student table or draft table
          const existingStudent = await tx.read(Student).where({ StudentID: student.StudentID });
          const existingDraft = await tx.read('MYSERVICE_STUDENT_DRAFTS').where({ StudentID: student.StudentID });

          if (existingStudent.length > 0 || existingDraft.length > 0) {
            continue; // Skip ID generation if exists
          }
        }

        // Validate PhoneNumber and Email
        if (student.PhoneNumber && !/^\d{10}$/.test(student.PhoneNumber)) {
          req.error(400, `Phone number ${student.PhoneNumber} is invalid. It must be exactly 10 digits.`);
          return;
        }

        if (student.PhoneNumber) {
          const existingPhoneSameDept = await tx.read(Student).where({ PhoneNumber: student.PhoneNumber, DepartmentID: req.data.DepartmentID });
          const existingPhone = await tx.read(Student).where({ PhoneNumber: student.PhoneNumber });
          const existingPhoneInDrafts = await tx.read('MYSERVICE_STUDENT_DRAFTS').where({ PhoneNumber: student.PhoneNumber });
          const teacherWithPhone = await tx.read(Teacher).where({ PhoneNumber: student.PhoneNumber });

          if (existingPhoneSameDept.length > 0 || existingPhone.length > 0 || existingPhoneInDrafts.length > 1 || teacherWithPhone.length > 0) {
            req.error(409, `Phone number ${student.PhoneNumber} already exists.`);
            return;
          }
        }

        if (student.Email && !student.Email.toLowerCase().endsWith('@gmail.com')) {
          req.error(400, `Email ${student.Email} is invalid. It must end with '@gmail.com'.`);
          return;
        }

        if (student.Email) {
          const existingEmailSameDept = await tx.read(Student).where({ Email: student.Email, DepartmentID: req.data.DepartmentID });
          const existingEmail = await tx.read(Student).where({ Email: student.Email });
          const existingEmailInDrafts = await tx.read('MYSERVICE_STUDENT_DRAFTS').where({ Email: student.Email });
          const teacherWithEmail = await tx.read(Teacher).where({ Email: student.Email });

          if (existingEmailSameDept.length > 0 || existingEmail.length > 0 || existingEmailInDrafts.length > 1 || teacherWithEmail.length > 0) {
            req.error(409, `Email ${student.Email} already exists.`);
            return;
          }
        }

        // Generate new StudentID
        const newStudentId = studentSequence.Value + 1;
        student.StudentID = `S${newStudentId}`;

        // Update the sequence value
        await UPDATE(Sequence).set({ Value: newStudentId }).where({ Name: 'StudentID' });

        // Increment sequence for the next student
        studentSequence.Value = newStudentId;
      }
    } else {
      console.error('deptToStudent is not in the expected format in req.data');
    }

    if (req.data.deptToTeacher && Array.isArray(req.data.deptToTeacher) && req.data.deptToTeacher.length > 0) {
      const tx = cds.transaction(req);
      let existingTeacherDraftIDs = [];

      // Collect all existing TeacherIDs in the draft table
      if (req.data.deptToTeacher.length > 1) {
        const existingTeacherDrafts = await tx.read('MYSERVICE_TEACHERDETAILS_DRAFTS').columns(['TeacherID']);
        existingTeacherDraftIDs = existingTeacherDrafts.map(teacher => teacher.TeacherID);

        // Check for duplicates within the request
        const teacherIDsInRequest = req.data.deptToTeacher.map(teacher => teacher.TeacherID);
        const uniqueTeacherIDsInRequest = new Set(teacherIDsInRequest);
        const hasRequestDuplicates = teacherIDsInRequest.length !== uniqueTeacherIDsInRequest.size;
        const hasDraftDuplicates = teacherIDsInRequest.some(id => existingTeacherDraftIDs.includes(id));

        if (hasRequestDuplicates && hasDraftDuplicates) {
          req.error(409, 'Duplicate TeacherID detected.');
          return;
        }
      }

      for (const teacher of req.data.deptToTeacher) {
        if (teacher.TeacherID) {
          // Check if TeacherID already exists in the Department
          const existingTeacherInDept = await tx.read('MYSERVICE_TEACHERDETAILS')
            .where({ TeacherID: teacher.TeacherID, DepartmentID: req.data.DepartmentID });
          if (existingTeacherInDept.length > 0) {
            req.error(409, `Teacher ID ${teacher.TeacherID} already exists in department ${req.data.DepartmentID}.`);
            return;
          }
        }
      }
    }
  });


  // Handle UPDATE operation for Department
  this.before('UPDATE', 'Department', async (req) => {
    const tx = cds.transaction(req);

    // Handle StudentID generation if there are students in deptToStudent
    if (req.data.deptToStudent && Array.isArray(req.data.deptToStudent) && req.data.deptToStudent.length > 0) {
      // Get the current sequence value for StudentID
      let studentSequence = await SELECT.one.from(Sequence).where({ Name: 'StudentID' });

      // If no sequence exists, initialize it
      if (!studentSequence) {
        studentSequence = { Name: 'StudentID', Value: 0 };
        await INSERT.into(Sequence).entries(studentSequence);
      }
      debugger;
      // Process each student
      for (const student of req.data.deptToStudent) {


        // Check if StudentID already exists in Student table
        if (student.StudentID) {
          const existingStudent = await tx.read(Student).where({ StudentID: student.StudentID });
          if (existingStudent.length > 0) {
            // StudentID exists in Student table, do not generate new ID
            continue;
          }
        }



        // Check if StudentID already exists in draft table
        if (student.StudentID) {
          const existingDraft = await tx.read('MYSERVICE_STUDENT_DRAFTS').where({ StudentID: student.StudentID });
          if (existingDraft.length > 0) {
            // StudentID exists in draft table, do not generate new ID
            continue;
          }
        }

        if (student.PhoneNumber) {
          debugger
          const existingPhone = await tx.read(Student).where({ PhoneNumber: student.PhoneNumber });
          if (existingPhone.length > 0) {
            req.error(409, `Phone number ${student.PhoneNumber} already exists.`);
            return;
          }



          // Check in the draft table as well
          const existingPhoneInDrafts = await tx.read('MYSERVICE_STUDENT_DRAFTS')
            .where({ PhoneNumber: student.PhoneNumber });
          if (existingPhoneInDrafts.length > 1) {
            req.error(409, `Phone number ${student.PhoneNumber} already exists in draft records.`);
            return;
          }
          const teacherWithPhone = await tx.read(Teacher).where({ PhoneNumber: student.PhoneNumber });
          if (teacherWithPhone.length > 0) {
            req.error(409, `Phone number ${student.PhoneNumber} already exists as a teacher's phone number.`);
            return;
          }


        }



        // Validate Email
        if (student.Email) {
          const existingEmail = await tx.read(Student).where({ Email: student.Email });
          if (existingEmail.length > 0) {
            req.error(409, `Email ${student.Email} already exists.`);
            return;
          }
          const existingEmailInDrafts = await tx.read('MYSERVICE_STUDENT_DRAFTS')
            .where({ Email: student.Email });
          if (existingEmailInDrafts.length > 1) {
            req.error(409, `Email ${student.Email} already exists in draft records.`);
            return;
          }
          const teacherWithEmail = await tx.read(Teacher).where({ Email: student.Email });
          if (teacherWithEmail.length > 0) {
            req.error(409, `Email ${student.Email} already exists as a teacher's email.`);
            return;
          }
        }

        // Generate new StudentID
        const newId = studentSequence.Value + 1;
        student.StudentID = `S${newId}`;

        // Update the sequence value
        await UPDATE(Sequence).set({ Value: newId }).where({ Name: 'StudentID' });

        // Increment sequence for the next student
        studentSequence.Value = newId;
      }
    } else {
      console.error('deptToStudent is not in the expected format in req.data');
    }
    const phoneMap = new Map();
    const emailMap = new Map();


    // Define validation patterns
    const phonePattern = /^\d{10}$/; // Exactly 10 digits
    const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/; // Ends with @gmail.com


    // Collect phone numbers and email addresses
    for (const student of req.data.deptToStudent) {
      console.log(`Processing student: ${student.StudentID}, Phone: ${student.PhoneNumber}, Email: ${student.Email}`);


      // Validate and collect phone numbers
      if (student.PhoneNumber) {
        if (!phonePattern.test(student.PhoneNumber)) {
          req.error(400, `Invalid phone number '${student.PhoneNumber}'. It must be exactly 10 digits.`);
          return; // Exit function since error occurred
        }

        if (phoneMap.has(student.PhoneNumber)) {
          // Phone number already exists, increment its count
          phoneMap.set(student.PhoneNumber, phoneMap.get(student.PhoneNumber) + 1);
        } else {
          // Initialize phone number count
          phoneMap.set(student.PhoneNumber, 1);
        }
      }


      // Validate and collect email addresses
      if (student.Email) {
        if (!emailPattern.test(student.Email)) {
          req.error(400, `Invalid email address '${student.Email}'. It must end with '@gmail.com'.`);
          return; // Exit function since error occurred
        }

        if (emailMap.has(student.Email)) {
          // Email address already exists, increment its count
          emailMap.set(student.Email, emailMap.get(student.Email) + 1);
        } else {
          // Initialize email count
          emailMap.set(student.Email, 1);
        }
      }
    }


    // Step 2: Check for duplicates in phone numbers and raise an error if necessary
    for (const [phoneNumber, count] of phoneMap.entries()) {
      if (count > 1) {
        // Phone number is duplicated across different StudentIDs
        req.error(409, `Phone number ${phoneNumber} already exists.`);
        return; // Exit function since error occurred
      }
    }


    // Step 3: Check for duplicates in email addresses and raise an error if necessary
    for (const [email, count] of emailMap.entries()) {
      if (count > 1) {
        // Email address is duplicated across different StudentIDs
        req.error(409, `Email address ${email} already exists.`);
        return; // Exit function since error occurred
      }
    }

    console.log('All phone numbers validated successfully.');


    const draftTeachers = await tx.read('MYSERVICE_TEACHERDETAILS_DRAFTS')
      .where({ DepartmentID: req.data.DepartmentID });

    // Create a Set to track seen TeacherID and DepartmentID combinations
    const seenTeachers = new Set();

    // Check for duplicates in the draft table
    for (const draftTeacher of draftTeachers) {
      const key = `${draftTeacher.TEACHERID}|${draftTeacher.DEPARTMENTID}`;

      if (seenTeachers.has(key)) {
        // If the combination is already seen, issue an error
        req.error(409, `Teacher ID '${draftTeacher.TEACHERID}' is already present for this department '${draftTeacher.DEPARTMENTID}'.`);
        return;
      }

      // Add the combination to the Set
      seenTeachers.add(key);
    }

  });

  // Handle READ operation for Department (to delete drafts with null DepartmentID)
  // this.before('READ', 'Department', async (req) => {
  //   // Delete drafts with null or empty DepartmentID and DepartmentName
  //   await DELETE.from('MYSERVICE_DEPARTMENT_DRAFTS')
  //     .where({
  //       DepartmentID: ''
  //     });
  // });

  // Handle CREATE operation for Teacher
  this.before('CREATE', 'Teacher', async (req) => {

    debugger
    if (req.data.teacherToFiles) {
      for (const stud of req.data.teacherToFiles) {

        stud.url = `/Files(ID=${stud.ID},IsActiveEntity=true)/content`

      }
    }
    // Validate Phone Number
    if (req.data.PhoneNumber) {
      if (!/^\d{10}$/.test(req.data.PhoneNumber)) {
        req.error(400, 'Phone number must be exactly 10 digits long.');
        return; // Exit if validation fails
      }

      const existingPhone = await SELECT.one.from(Teacher).where({ PhoneNumber: req.data.PhoneNumber });
      if (existingPhone) {
        req.error(409, `Phone number ${req.data.PhoneNumber} already exists.`);
        return; // Exit if validation fails
      }
    }


    //newwwwwwwwwpdfffattachment
    // console.log('Create called')
    // console.log(JSON.stringify(req.data))
    // console.log("helloooooo",req.data.url);
    // req.data.url = `/odata/v4/my/Files(${req.data.ID})/content`





    // Validate Email
    if (req.data.Email) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.data.Email) || !req.data.Email.endsWith('@gmail.com')) {
        req.error(400, 'Email must end with @gmail.com.');
        return; // Exit if validation fails
      }

      const existingEmail = await SELECT.one.from(Teacher).where({ Email: req.data.Email });
      if (existingEmail) {
        req.error(409, `Email ${req.data.Email} already exists.`);
        return; // Exit if validation fails
      }
    }

    // Get the current sequence value for TeacherID
    // let teacherSequence = await SELECT.one.from(Sequence).where({ Name: 'TeacherID' });

    // // If no sequence exists, initialize it
    // if (!teacherSequence) {
    //     teacherSequence = { Name: 'TeacherID', Value: 0 };
    //     await INSERT.into(Sequence).entries(teacherSequence);
    // }

    // // Generate new TeacherID
    // const newId = teacherSequence.Value + 1;
    // req.data.TeacherID = `T${newId}`;

    // // Update the sequence value
    // await UPDATE(Sequence).set({ Value: newId }).where({ Name: 'TeacherID' });


    //     //sap build process teaher
    req.data.TeacherID = '';
    req.data.Status = "InProcess";


    //locallyyyyyyyyyyyyy
    // const oauthToken = await generateToken();
    // var token = `Bearer ${oauthToken}`;


    const phoneNumber = Number(req.data.PhoneNumber);
    if (isNaN(phoneNumber)) {
      req.error(400, 'Phone number must be a valid number.');
      return;
    }


    //filelinkkkkkkkkkkkk new
    var sUrl = "Teacher(ttuuid=" + req.data.ttuuid + ",IsActiveEntity=true)/teacherToFiles";





    //dropdown departmentttt thirddd emaillll
    debugger
    let emailForRejected = '';
    const inputdepartmentname = req.data.Lect_dept_name ;
    console.log(inputdepartmentname);
    let userData = await SELECT.one.from(AAuthorized).where({ authName: inputdepartmentname });
    console.log(userData);
    if (userData) {
      emailForRejected = userData.authEmail;
    }

    else {
      const Admin = await SELECT.one.from(AAuthorized).where({ authName: 'other' });
      console.log(Admin);
      if (Admin) {
        emailForRejected = Admin.authEmail ;
      }
    }
    var data =
    {

  "definitionId": "us10.a9929629trial.nwcollprocess12.collegeapna",
    "context": {
        "_name": req.data.Name,
        "address": req.data.Address ,
        "age": req.data.Age,
        "department":req.data.Lect_dept_name,
        "dob": req.data.DOB,
        "email":req.data.Email,
        "hodemail": emailForRejected,
        "pdfdocument": sUrl,
        "phoneNumber": phoneNumber,
        "rejectedby": emailForRejected,
        "status": " ",
        "teacherid": req.data.TeacherID,
        "ttuuid": req.data.ttuuid,
        "gender": req.data.gender
    }
   }


  

    // //globalllllllllllll
    var BpaDest = await cds.connect.to("spa_api");
    var result = await BpaDest.post('/workflow/rest/v1/workflow-instances', data);





    //localllllllllllllll
    // console.log('Payload data:', data);
    // debugger
    // const response = await axios.post(
    //   "https://spa-api-gateway-bpi-us-prod.cfapps.us10.hana.ondemand.com/workflow/rest/v1/workflow-instances",
    //   data,
    //   {
    //     headers: {
    //       "Accept-Language": "en",
    //       "DataServiceVersion": "2.0",
    //       "Accept": "application/json",
    //       "Content-Type": "application/json",
    //       "Authorization": token
    //     }
    //   }
    // );

    //dob validation
    // const { DOB, Age } = req.data;
    // // Calculate the year of birth based on the age
    // const currentYear = 2024;
    // const birthYear = new Date(DOB).getFullYear();
    // const expectedYear = currentYear - Age;
    // if (birthYear !== expectedYear) {
    //   req.error(400, `The DOB ${DOB} does not match the specified Age ${Age}. The expected year of birth is ${expectedYear}.`);
    // }
  });



  //new code for build processs
  this.after('UPDATE', 'Teacher', async (req) => {
    debugger
    //   // const tx = cds.transaction(req);
    if (req.Status === 'Approved' && !req.TeacherID) {
      let teacherSequence = await SELECT.one.from(Sequence).where({ Name: 'TeacherID' });
      if (!teacherSequence) {
        teacherSequence = { Name: 'TeacherID', Value: 0 };
        await INSERT.into(Sequence).entries(teacherSequence);
      }
      const newId = teacherSequence.Value + 1;
      const newTID = `T${newId}`;
      var idha = req.ttuuid;
      await cds.update(Teacher).set({ TeacherID: newTID }).where({ ttuuid: idha });
      await cds.update(Sequence).set({ Value: newId }).where({ Name: 'TeacherID' });
    }



  });

  this.before('UPDATE', Teacher, req => {
    debugger
    if (req.data.teacherToFiles) {
      for (const stud of req.data.teacherToFiles) {

        stud.url = `/Files(ID=${stud.ID},IsActiveEntity=true)/content`

      }
    }
  })
  //pdf attachment
  // module.exports = async function () {
  this.before('CREATE', 'Files', req => {
      console.log('Create called')
      console.log(JSON.stringify(req.data))
      console.log("helloooooo",req.data.url);
      req.data.url = `/Files(ID=${req.data.ID},IsActiveEntity=true)/content`
  })


  this.before(['CREATE', 'UPDATE'], Files.drafts, req => {
    console.log('Create Update Draft called')
    console.log(JSON.stringify(req.data))
    req.data.url = `/Files(ID=${req.data.ID},IsActiveEntity=true)/content`
  });
  //teacherToFiles

  // async function fileUpload(req) {
  //   if(req.data.teachtofile){
  //       for (const stud of req.data.teacherToFiles) { 
  //           if(!stud.url) {
  //               stud.url = `/odata/v4/my/Files(ID=${stud.ID},IsActiveEntity=true)/content`
  //           }
  //       }
  //   }

  // }
  // this.before('UPDATE', 'Teacher', fileUpload);
  // this.before('CREATE', 'Teacher', fileUpload);








  // this.before('UPDATE', Teacher, fileUpload);
  // this.before('CREATE', Teacher, fileUpload);
  // async function fileUpload(req) {
  //   debugger
  //   if (req.data.teacherToFiles) {
  //     for (const stud of req.data.teacherToFiles) {
  //       stud.url = req.req.baseUrl+`/Files(ID=${stud.ID},IsActiveEntity=true)/content`

  //     }
  //   }
  // }


  this.before('UPDATE', 'Teacher', async (req) => {
    const tx = cds.transaction(req);

    // Validate Phone Number
    if (req.data.PhoneNumber) {
      if (!/^\d{10}$/.test(req.data.PhoneNumber)) {
        req.error(400, 'Phone number must be exactly 10 digits long.');
        return; // Exit if validation fails
      }

      const existingPhone = await SELECT.one.from(Teacher)
        .where({ PhoneNumber: req.data.PhoneNumber, TeacherID: { '!=': req.data.TeacherID } });
      if (existingPhone) {
        req.error(409, `Phone number ${req.data.PhoneNumber} already exists.`);
        return; // Exit if validation fails
      }
    }

    // Validate Email
    if (req.data.Email) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.data.Email) || !req.data.Email.endsWith('@gmail.com')) {
        req.error(400, 'Email must end with @gmail.com.');
        return; // Exit if validation fails
      }

      const existingEmail = await SELECT.one.from(Teacher)
        .where({ Email: req.data.Email, TeacherID: { '!=': req.data.TeacherID } });
      if (existingEmail) {
        req.error(409, `Email ${req.data.Email} already exists with ID '${existingEmail.TeacherID}'.`);
        return; // Exit if validation fails
      }
    }



    //dob validation
    //    const { DOB, Age } = req.data;
    //    // Calculate the year of birth based on the age
    //    const currentYear = 2024;
    //    const birthYear = new Date(DOB).getFullYear();
    //    const expectedYear = currentYear - Age;
    //    if (birthYear !== expectedYear) {
    //      req.error(400, `The DOB ${DOB} does not match the specified Age ${Age}. The expected year of birth is ${expectedYear}.`);
    //    }
  });




  //age logic
  // this.on('READ', Teacher.drafts, async (req, next) => { 

  //     return next()
  //   });






  //calculate ageeeeee olddd

  // this.on('READ', Teacher.drafts, async (req, next) => {
  
  //   if (req.data.DOB) {
  //     var ageCal = calculateAge(req.data.DOB);
  //     // req.data.Age = ageCal;
  //     await cds.update(Teacher.drafts).set({ Age: ageCal }).where({ ttuuid: req.data.ttuuid });
  //   }
  //   return next()
  // });





  // function calculateAge(dob) {
  //   const today = new Date();
  //   const birthDate = new Date(dob);
  //   let age = today.getFullYear() - birthDate.getFullYear();
  //   const monthDifference = today.getMonth() - birthDate.getMonth();

  //   if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
  //     age--;
  //   }
  //   return age;
  // }




  
this.on('READ', Teacher.drafts, async (req, next) => {
  if (req.data.DOB) {
      const ageResult = calculateAge(req.data.DOB);

      if (ageResult.error) {
          // Return an error response if the age is invalid
          return req.reject(400, ageResult.error);
      }

      // Update the Age if valid
      await cds.update(Teacher.drafts).set({ Age: ageResult.age }).where({ ttuuid: req.data.ttuuid });
  }

  return next();
});


function calculateAge(dob) {
  const today = new Date();
  const birthDate = new Date(dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
  }

  if (age < 18 || age > 70) {
      return { error: "Please enter a valid date of birth that results in an age between 18 and 70 years." };
  }

  return { age };
}

  
});
