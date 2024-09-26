using MyService as service from '../../srv/service';
annotate service.Department with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'Department ID',
                Value : DepartmentID,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Department Name',
                Value : DepartmentName,
            },
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'Department Information',
            Target : '@UI.FieldGroup#GeneratedGroup',
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Teachers List',
            ID : 'TeachersList',
            Target : 'deptToTeacher/@UI.LineItem#TeachersList',
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Students List',
            ID : 'StudentsList',
            Target : 'deptToStudent/@UI.LineItem#StudentsList',
        },
    ],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'Department ID',
            Value : DepartmentID,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Department Name',
            Value : DepartmentName,
        },
    ],
);

annotate service.TeacherDetails with @(
    UI.LineItem #TeachersList : [
        {
            $Type : 'UI.DataField',
            Value : TeacherID,
            Label : 'Teacher ID',
        },{
            $Type : 'UI.DataField',
            Value : Name,
            Label : 'Name',
        },{
            $Type : 'UI.DataField',
            Value : Email,
            Label : 'Email',
        },{
            $Type : 'UI.DataField',
            Value : PhoneNumber,
            Label : 'PhoneNumber',
        },]
);
annotate service.Student with @(
    UI.LineItem #StudentsList : [
        {
            $Type : 'UI.DataField',
            Value : StudentID,
            Label : 'Student ID',
        },{
            $Type : 'UI.DataField',
            Value : Name,
            Label : 'Name',
        },{
            $Type : 'UI.DataField',
            Value : PhoneNumber,
            Label : 'Phone Number',
        },{
            $Type : 'UI.DataField',
            Value : Email,
            Label : 'Email',
        },]
);
annotate service.TeacherDetails with {
    TeacherID @(Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'Teacher',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : TeacherID,
                    ValueListProperty : 'TeacherID',
                },
                {
                    $Type : 'Common.ValueListParameterOut',
                    ValueListProperty : 'Name',
                    LocalDataProperty : Name,
                },
                {
                    $Type : 'Common.ValueListParameterOut',
                    ValueListProperty : 'PhoneNumber',
                    LocalDataProperty : PhoneNumber,
                },
                {
                    $Type : 'Common.ValueListParameterOut',
                    ValueListProperty : 'Email',
                    LocalDataProperty : Email,
                },
                {
                    $Type : 'Common.ValueListParameterIn',
                    ValueListProperty : 'Status',
                    LocalDataProperty : Status,
                },
            ],
            Label : 'List of Teachers',
        },
        Common.ValueListWithFixedValues : true
)};
annotate service.Department with @(
    UI.HeaderInfo : {
        Title : {
            $Type : 'UI.DataField',
            Value : DepartmentName,
        },
        TypeName : '',
        TypeNamePlural : '',
        TypeImageUrl : 'sap-icon://appear-offline',
        ImageUrl : DepartmentName,
    }
);
annotate service.Student with @(
    UI.HeaderInfo : {
        ImageUrl : StudentID,
        TypeName : '',
        TypeNamePlural : '',
    }
);
annotate service.Student with @(
    UI.HeaderFacets : [
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Student Info',
            ID : 'Student',
            Target : '@UI.FieldGroup#Student',
        },
    ],
    UI.FieldGroup #Student : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : studToDepartment.deptToStudent.Name,
                Label : 'Name',
            },{
                $Type : 'UI.DataField',
                Value : studToDepartment.deptToStudent.PhoneNumber,
                Label : 'PhoneNumber',
            },],
    }
);
annotate service.Department with {
    DepartmentName @Common.FieldControl : #Mandatory
};
annotate service.TeacherDetails with @(
    UI.HeaderFacets : [
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Teacher Info',
            ID : 'TeacherInfo',
            Target : '@UI.FieldGroup#TeacherInfo',
        },
    ],
    UI.FieldGroup #TeacherInfo : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : teachToDept.deptToTeacher.Name,
                Label : 'Name',
            },{
                $Type : 'UI.DataField',
                Value : teachToDept.deptToTeacher.PhoneNumber,
                Label : 'PhoneNumber',
            },{
                $Type : 'UI.DataField',
                Value : teachToDept.deptToTeacher.Email,
                Label : 'Email',
            },],
    }
);
annotate service.TeacherDetails with @(
    UI.HeaderInfo : {
        Title : {
            $Type : 'UI.DataField',
            Value : Name,
        },
        TypeName : '',
        TypeNamePlural : '',
        ImageUrl : Name,
    }
);
