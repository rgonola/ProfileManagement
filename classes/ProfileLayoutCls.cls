public class ProfileLayoutCls{
    @AuraEnabled public Integer totalSize;
    @AuraEnabled public boolean done;
    @AuraEnabled public String nextRecordsUrl;
    @AuraEnabled public String queryLocator;
    @AuraEnabled public String entityTypeName;  
    @AuraEnabled public cls_records[] records;
    public class cls_records {
        public cls_attributes attributes;
        @AuraEnabled public cls_Layout Layout;
        @AuraEnabled public String ProfileId;
        @AuraEnabled public cls_Profile Profile;
        @AuraEnabled public String RecordTypeId;
         @AuraEnabled public cls_Profile RecordType;
         
         //Workflow related fields
        @AuraEnabled public String Id; 
        @AuraEnabled public String Name;
        @AuraEnabled public String ManageableState;
        @AuraEnabled public String NamespacePrefix;
        @AuraEnabled public String TableEnumOrId;
        @AuraEnabled public String DeveloperName;
        
        //Validationrule related fields
        @AuraEnabled public String ValidationName; 
        @AuraEnabled public String Active;
        @AuraEnabled public String Description;
        @AuraEnabled public String ErrorDisplayField;
        @AuraEnabled public cls_EntityDefinition EntityDefinition;
        @AuraEnabled public String ErrorMessage;
    }
    public class cls_attributes {
        @AuraEnabled public String type;
        @AuraEnabled public String url;
    }
    public class cls_Layout {
        public cls_attributes attributes;
        @AuraEnabled public String Name;
        @AuraEnabled public String TableEnumOrId;
        @AuraEnabled public String ManageableState;
    }
    public class cls_Profile {
        public cls_attributes attributes;
        @AuraEnabled public String Name;
    }
    
     public class cls_EntityDefinition {
        public cls_attributes attributes;
        @AuraEnabled public String QualifiedApiName;
    }
    
     public ProfileLayoutCls(){
        
    }
}