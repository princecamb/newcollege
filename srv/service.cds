using db from '../db/schema';

service MyService {
    @odata.draft.enabled
    entity Department as projection on db.Department;
    entity Student as projection on db.Student;
    entity TeacherDetails as projection on db.TeacherDetails;
    @odata.draft.enabled
    
    @Common.SideEffects  : {
        $Type : 'Common.SideEffectsType',
        SourceProperties : [
            'DOB'
        ],
        TargetProperties : [
            'Age',
        ]
    }
    entity Teacher as projection on db.Teacher;
    //  function postattach(p : String)           returns String;
    entity Files as projection on db.Files;
    @odata.draft.enabled
    entity Sequence as projection on db.Sequence;
    @odata.draft.enabled
    entity AAuthorized as projection on db.Authorized;
    entity Gender as projection on db.Gendery;
}




