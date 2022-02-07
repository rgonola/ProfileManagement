public class ProcessBuilderMetaData{
    @AuraEnabled public Integer size;   //3
    @AuraEnabled public Integer totalSize;  //3
    @AuraEnabled public boolean done;
    @AuraEnabled public cls_queryLocator queryLocator;
    @AuraEnabled public String entityTypeName;  //FlowDefinition
    @AuraEnabled public cls_records[] records;
    public class cls_queryLocator {
    }
    public class cls_records {
        @AuraEnabled public cls_attributes attributes;
        @AuraEnabled public String Id;  //3002E000000g2kGQAQ
        @AuraEnabled public cls_ActiveVersion ActiveVersion;
        @AuraEnabled public cls_LatestVersion LatestVersion;
        @AuraEnabled public String DeveloperName;   //Test_API_Name
    }
    public class cls_attributes {
        @AuraEnabled public String type;    //Flow
        @AuraEnabled public String url; ///services/data/v45.0/tooling/sobjects/Flow/3012E000000gAukQAE
    }
    public class cls_ActiveVersion {
        @AuraEnabled public Integer VersionNumber;
    }
    public class cls_LatestVersion {
        @AuraEnabled public cls_attributes attributes;
        @AuraEnabled public Integer VersionNumber;  //1
    }
    
    public ProcessBuilderMetaData(){
        
    }
}