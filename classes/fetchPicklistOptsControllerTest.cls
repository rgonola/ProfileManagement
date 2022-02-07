@isTest
global class fetchPicklistOptsControllerTest {
    static testMethod void fetchUserSessionIdTest(){
        test.startTest();
        PageReference pageRef = Page.GetSessionId;
        Test.setCurrentPage(pageRef);
        fetchPicklistOptsController.fetchUserSessionId();
        test.stopTest();
        
    }
    
    static testMethod void getselectOptionsTest(){
        test.startTest();
        fetchPicklistOptsController.getselectOptions('Account','Name');
        test.stopTest();
    }
    
    static testMethod void getObjectPermissionsTest(){
        test.startTest();
        fetchPicklistOptsController.getObjectPermissions('System Administrator');
        test.stopTest();
    }
    
    static testMethod void getFieldPermissionsTest(){
        test.startTest();
        fetchPicklistOptsController.getFieldPermissions('System Administrator','Account');
        test.stopTest();
    }
    
    @isTest
    public static void ProfileLayoutClsTest(){
        
        ProfileLayoutCls.cls_attributes attrib = new ProfileLayoutCls.cls_attributes();
        attrib.type = 'type';
        attrib.url = 'url';
        
        ProfileLayoutCls.cls_Layout layoutcls = new ProfileLayoutCls.cls_Layout();
        layoutcls.attributes = attrib;
        layoutcls.Name = 'Name';
        layoutcls.TableEnumOrId = 'TableEnumOrId';
        layoutcls.ManageableState = 'ManageableState';
        
        ProfileLayoutCls.cls_Profile pro = new ProfileLayoutCls.cls_Profile();
        pro.attributes = attrib;
        pro.Name = 'Name';
        
        ProfileLayoutCls.cls_EntityDefinition entity = new ProfileLayoutCls.cls_EntityDefinition();
        entity.attributes = attrib;
        entity.QualifiedApiName = 'QualifiedApiName';
        
        ProfileLayoutCls.cls_records recs = new ProfileLayoutCls.cls_records();
        recs.ProfileId = 'ProfileId';
        recs.RecordTypeId ='RecordTypeId';
        recs.Id = 'Id'; 
        recs.Name = 'Name';
        recs.ManageableState = 'ManageableState';
        recs.NamespacePrefix = 'NamespacePrefix';
        recs.TableEnumOrId = 'TableEnumOrId';
        recs.DeveloperName = 'DeveloperName';
        recs.ValidationName = 'ValidationName'; 
        recs.Active = 'Active';
        recs.Description = 'Description';
        recs.ErrorDisplayField = 'ErrorDisplayField';
        recs.ErrorMessage = 'ErrorMessage';
        recs.attributes = attrib;
        recs.Layout = layoutcls;
        recs.Profile = pro;
        recs.EntityDefinition = entity;
        recs.RecordType = pro;
        
        ProfileLayoutCls plc = new ProfileLayoutCls();
        plc.totalSize = 5;
        plc.done = true;
        plc.nextRecordsUrl = 'testurl';
        plc.queryLocator = 'test';
        plc.entityTypeName = 'Account';
        plc.records = new List<ProfileLayoutCls.cls_records>{recs};
            }
    
    static testMethod void getFieldPermissionsTest1(){
        test.startTest();
        Test.setMock(HttpCalloutMock.class, new CalloutMock());
        fetchPicklistOptsController.getFieldPermissions('System Administrator','01I31000001qsqkEAA');
        test.stopTest();
    }
    
    
    
    static testMethod void  getProfileLayoutTest(){
        test.startTest();
        Test.setMock(HttpCalloutMock.class, new CalloutMock());
        ProfileLayoutCls.cls_records[] res = fetchPicklistOptsController.getProfileLayout('Customer','Account');
        test.stopTest();
    }
    
    static testMethod void  getProfileNamesTest(){
        test.startTest();
        Test.setMock(HttpCalloutMock.class, new CalloutMock());
        List<String> res = fetchPicklistOptsController.getProfileNames('Test');
        test.stopTest();
    }
    
    static testMethod void  getTableEnumOrIdTest(){
        test.startTest();
        Test.setMock(HttpCalloutMock.class, new CalloutMock());
        Map<String,String> res = fetchPicklistOptsController.getTableEnumOrId();
        test.stopTest();
    }
    
    static testMethod void  getWorkflowRulesTest(){
        test.startTest();
        Test.setMock(HttpCalloutMock.class, new CalloutMock());
        ProfileLayoutCls.cls_records[] res = fetchPicklistOptsController.getWorkflowRules ('Cox_Deal__c');
        test.stopTest();
    }
    
    static testMethod void  getValidationRulesTest(){
        test.startTest();
        Test.setMock(HttpCalloutMock.class, new CalloutMock());
        ProfileLayoutCls.cls_records[] res = fetchPicklistOptsController.getValidationRules('Cox_Deal__c');
        test.stopTest();
    }
    
    static testMethod void  getCustomButtonsTest(){
        test.startTest();
        Test.setMock(HttpCalloutMock.class, new CalloutMock());
        List <WebLink> res = fetchPicklistOptsController.getCustomButtons('01I31000001qsqkEAA');
        test.stopTest();
    }
    
    static testMethod void  getTasksTest(){
        test.startTest();
        Test.setMock(HttpCalloutMock.class, new CalloutMock());
        fetchPicklistOptsController.getTasks();
        test.stopTest();
    }
    
    static testMethod void  getVisualforcePagesTest(){
        test.startTest();
        Test.setMock(HttpCalloutMock.class, new CalloutMock());
        List<String> res = fetchPicklistOptsController.getVisualforcePages('Account');
        test.stopTest();
    }
    
    static testMethod void  getVisualforcePagesTest1(){
        test.startTest();
        Test.setMock(HttpCalloutMock.class, new CalloutMock());
        List<String> res = fetchPicklistOptsController.getVisualforcePages('01I31000001qsqkEAA');
        test.stopTest();
    }
    
    static testMethod void  getFolderNamesTest(){
        test.startTest();
        Test.setMock(HttpCalloutMock.class, new CalloutMock());
        List<String> res = fetchPicklistOptsController.getFolderNames();
        test.stopTest();
    }
    
    static testMethod void  getGroupNamesTest(){
        test.startTest();
        Test.setMock(HttpCalloutMock.class, new CalloutMock());
        List<String> res = fetchPicklistOptsController.getGroupNames();
        test.stopTest();
        
    }
    static testMethod void  getReportDataTest(){
        test.startTest();
        Test.setMock(HttpCalloutMock.class, new CalloutMock());
        List<ReportInformation> res = fetchPicklistOptsController.getReportData('Test');
        test.stopTest();
    }
    
    static testMethod void  getDashboardDataTest(){
        test.startTest();
        Test.setMock(HttpCalloutMock.class, new CalloutMock());
        List<Dashboard> res = fetchPicklistOptsController.getDashboardData('Test');
        test.stopTest();
    }
    
    static testMethod void  getDashboardFolderNamesTest(){
        test.startTest();
        Test.setMock(HttpCalloutMock.class, new CalloutMock());
        List<String> res = fetchPicklistOptsController.getDashboardFolderNames();
        test.stopTest();
    }
    
    static testMethod void  getGroupDataTest(){
        test.startTest();
        Test.setMock(HttpCalloutMock.class, new CalloutMock());
        List<User> res = fetchPicklistOptsController.getGroupData('Test');
        test.stopTest();
    }
    
    @isTest
    public static void ReportInformationTest(){
        ReportInformation ri = new ReportInformation();
        ri.Id='Id';
        ri.name = 'Test';
        ri.folderName = 'folderName';
        ri.objectName = 'TestObj__c';
    }
    
    @isTest
    public static void ProcessBuilderMetaDataTest(){
        
        ProcessBuilderMetaData.cls_attributes attrib = new ProcessBuilderMetaData.cls_attributes();
        attrib.type = 'type';
        attrib.url = 'url';
        
        ProcessBuilderMetaData.cls_ActiveVersion vers = new ProcessBuilderMetaData.cls_ActiveVersion();
        vers.VersionNumber = 1;
        
        ProcessBuilderMetaData.cls_LatestVersion LatVer = new ProcessBuilderMetaData.cls_LatestVersion();
        LatVer.attributes = attrib;
        LatVer.VersionNumber = 2;
        
        ProcessBuilderMetaData.cls_records recs = new ProcessBuilderMetaData.cls_records();
        recs.attributes = attrib;
        recs.Id = 'Id';
        recs.ActiveVersion = vers;
        recs.LatestVersion = LatVer; 
        recs.DeveloperName = 'Developer Name';
        
        ProcessBuilderMetaData.cls_queryLocator queryLoc = new ProcessBuilderMetaData.cls_queryLocator();
        
        ProcessBuilderMetaData pbmd = new ProcessBuilderMetaData();
        pbmd.size = 5;
        pbmd.totalSize =10;
        pbmd.done = true;
        pbmd.queryLocator = queryLoc;
        pbmd.entityTypeName = 'entityTypeName';
        pbmd.records = new List<ProcessBuilderMetaData.cls_records>{recs};
            }
    
    static testMethod void  getProcessBuildersTest(){
        test.startTest();
        Test.setMock(HttpCalloutMock.class, new CalloutMock());
        ProcessBuilderMetaData.cls_records[] res = fetchPicklistOptsController.getProcessBuilders();
        test.stopTest();
    }
    
    public class CalloutMock implements HttpCalloutMock{
        public HttpResponse respond(HTTPRequest req){
            HttpResponse res = new HttpResponse();
            res.setStatus('OK');
            res.setStatusCode(200);
            res.setBody('{"size":7,"totalSize":7,"done":true,"queryLocator":null,"entityTypeName":"ProfileLayout","records":[{"Layout":{"Name":"Account (Sales) Layout","TableEnumOrId":"Account"},"Profile":null,"ProfileId":"00e1U000000T0mCQAS","RecordTypeId":"0121U000000G4qnQAC","RecordType":{"Name":"Test2"}}]}');
            return res;
        }
    } 
}