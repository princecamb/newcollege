using MyService as service from '../../srv/service';
annotate service.Teacher with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'Teacher ID',
                Value : TeacherID,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Name',
                Value : Name,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Phone Number',
                Value : PhoneNumber,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Email',
                Value : Email,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Address',
                Value : Address,
            },
            {
                $Type : 'UI.DataField',
                Value : Age,
                Label : 'Age',
            },
            {
                $Type : 'UI.DataField',
                Value : DOB,
                Label : 'DOB',
            },
            {
                $Type : 'UI.DataField',
                Value : Lect_dept_name,
                Label : 'Lect_dept_name',
            },
            {
                $Type : 'UI.DataField',
                Value : gender,
                Label : 'gender',
            },
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'Teacher Information',
            Target : '@UI.FieldGroup#GeneratedGroup',
        },
    ],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'Teacher ID',
            Value : TeacherID,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Name',
            Value : Name,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Phone Number',
            Value : PhoneNumber,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Email',
            Value : Email,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Address',
            Value : Address,
        },
        {
            $Type : 'UI.DataField',
            Value : Age,
            Label : 'Age',
        },
        {
            $Type : 'UI.DataField',
            Value : DOB,
            Label : 'DOB',
        },
        {
            $Type : 'UI.DataField',
            Value : Lect_dept_name,
            Label : 'Lect_dept_name',
        },
    ],
);

annotate service.Teacher with @(
    UI.HeaderInfo : {
        Title : {
            $Type : 'UI.DataField',
            Value : Name,
        },
        TypeName : '',
        TypeNamePlural : '',
        TypeImageUrl : 'sap-icon://account',
        ImageUrl : Name,
    }
);
annotate service.Teacher with @(
    UI.SelectionPresentationVariant #tableView : {
        $Type : 'UI.SelectionPresentationVariantType',
        PresentationVariant : {
            $Type : 'UI.PresentationVariantType',
            Visualizations : [
                '@UI.LineItem',
            ],
        },
        SelectionVariant : {
            $Type : 'UI.SelectionVariantType',
            SelectOptions : [
                {
                    $Type : 'UI.SelectOptionType',
                    PropertyName : Status,
                    Ranges : [
                        {
                            Sign : #I,
                            Option : #EQ,
                            Low : 'Approved',
                        },
                    ],
                },
            ],
        },
        Text : 'Approved',
    },
    UI.LineItem #tableView : [
        {
            $Type : 'UI.DataField',
            Value : TeacherID,
            Label : 'TeacherID',
        },{
            $Type : 'UI.DataField',
            Value : Name,
            Label : 'Name',
        },{
            $Type : 'UI.DataField',
            Value : PhoneNumber,
            Label : 'PhoneNumber',
        },{
            $Type : 'UI.DataField',
            Value : Email,
            Label : 'Email',
        },{
            $Type : 'UI.DataField',
            Value : Address,
            Label : 'Address',
        },
        {
            $Type : 'UI.DataField',
            Value : RejectedBy,
            Label : 'RejectedBy',
        },],
    UI.SelectionPresentationVariant #tableView1 : {
        $Type : 'UI.SelectionPresentationVariantType',
        PresentationVariant : {
            $Type : 'UI.PresentationVariantType',
            Visualizations : [
                '@UI.LineItem#tableView',
            ],
        },
        SelectionVariant : {
            $Type : 'UI.SelectionVariantType',
            SelectOptions : [
                {
                    $Type : 'UI.SelectOptionType',
                    PropertyName : Status,
                    Ranges : [
                        {
                            Sign : #I,
                            Option : #EQ,
                            Low : 'Rejected',
                        },
                    ],
                },
            ],
        },
        Text : 'Rejected',
    }
);
annotate service.Teacher with @(
    UI.LineItem #tableView1 : [
        {
            $Type : 'UI.DataField',
            Value : TeacherID,
            Label : 'TeacherID',
        },{
            $Type : 'UI.DataField',
            Value : Name,
            Label : 'Name',
        },{
            $Type : 'UI.DataField',
            Value : PhoneNumber,
            Label : 'PhoneNumber',
        },{
            $Type : 'UI.DataField',
            Value : Email,
            Label : 'Email',
        },{
            $Type : 'UI.DataField',
            Value : Address,
            Label : 'Address',
        },],
    UI.SelectionPresentationVariant #tableView2 : {
        $Type : 'UI.SelectionPresentationVariantType',
        PresentationVariant : {
            $Type : 'UI.PresentationVariantType',
            Visualizations : [
                '@UI.LineItem#tableView1',
            ],
        },
        SelectionVariant : {
            $Type : 'UI.SelectionVariantType',
            SelectOptions : [
                {
                    $Type : 'UI.SelectOptionType',
                    PropertyName : Status,
                    Ranges : [
                        {
                            Sign : #I,
                            Option : #EQ,
                            Low : 'InProcess',
                        },
                    ],
                },
            ],
        },
        Text : 'In Process',
    }
);
annotate service.Teacher with {
    Lect_dept_name @(Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'Department',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : Lect_dept_name,
                    ValueListProperty : 'DepartmentName',
                },
            ],
        },
        Common.ValueListWithFixedValues : false
)};

annotate service.Teacher with {
    gender @(Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'Gender',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : gender,
                    ValueListProperty : 'genVal',
                },
            ],
        },
        Common.ValueListWithFixedValues : true
)};

annotate service.Teacher with {
    TeacherID @Common.FieldControl : #ReadOnly
};

