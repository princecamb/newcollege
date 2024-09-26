namespace db;
entity Department {
    key uuid : UUID;
    key DepartmentID   : String default'' @readonly;
        DepartmentName : String @mandatory;
        deptToStudent  : Composition of many Student on deptToStudent.studToDepartment = $self;
        deptToTeacher : Composition of many TeacherDetails on deptToTeacher.teachToDept = $self;
}
entity Student {
    key suuid : UUID;
    key StudentID        : String default'' @readonly;
        DepartmentID     : String;
        Name             : String @mandatory;
        PhoneNumber      : String @mandatory;
        Email            : String @mandatory;
        Address          : String;
        studToDepartment : Association to one Department on studToDepartment.DepartmentID = DepartmentID;
}
// entity Teacher {
//     key ttuuid : UUID;
//     key TeacherID    : String default'' @readonly;
//         Name         : String @mandatory;
//         PhoneNumber  : String @mandatory;
//         Email        : String @mandatory;
//         age : Integer;
//         dateOfBirth: Date;
//         departmentName: String;
        
       
// }

entity Teacher {
key ttuuid : UUID;
TeacherID : String @title: 'Teacher ID';
Name : String @mandatory;
PhoneNumber : String  @title: 'Phone Number' @mandatory;
Email : String @mandatory;
Address : String @mandatory;
Age : Integer @assert.range: [18, 70];
Lect_dept_name : String default '' @mandatory;
DOB :  Date @mandatory;
Status: String default 'InProcess' ;
RejectedBy : String;
gender : String @mandatory;
teacherToFiles : Composition of many Files on teacherToFiles.filesToTeacher = $self;
}



entity TeacherDetails {
    key Tuuid : UUID;
    key TeacherID : String;
     DepartmentID     : String;
    Name         : String @mandatory;
    PhoneNumber  : String @mandatory;
    Email        : String @mandatory;
    Address      : String;
    Status: String default 'Approved' ;
    teachToDept : Association to many Department on teachToDept.DepartmentID = DepartmentID;
}


entity Sequence {
    key Name : String;
    Value   : Integer;
}


entity Authorized{
    authName : String;
    authEmail :String;
}

entity Gendery{
    genVal : String;
}

using {
    cuid,
    managed
} from '@sap/cds/common';


entity Files: cuid, managed{
    @Core.MediaType: mediaType
    content: LargeBinary;
    @Core.IsMediaType: true
    mediaType: String;
    fileName: String;
    size: Integer;
    url: String;
    ttuuid : String;
    filesToTeacher : Association to many Teacher on filesToTeacher.ttuuid = ttuuid;
}

