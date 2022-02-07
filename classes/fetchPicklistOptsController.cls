/**
 * @description       : 
 * @author            : Shanthan Chintala
 * @group             : 
 * @last modified on  : 11-02-2020
 * @last modified by  : Dinesh Ramanadham
 * Modifications Log 
 * Ver   Date         Author              Modification
 * 1.0   11-02-2020   Dinesh Ramanadham   Initial Version
**/
public class fetchPicklistOptsController {
    
    public static String fetchUserSessionId(){
        String sessionId = '';
        PageReference pageRef = Page.GetSessionId;
        Blob content;
        if (Test.IsRunningTest()){
            content=Blob.valueOf('Start_Of_Session_Id_FakeSessionIdxxxx_End_Of_Session_Id');
        } else {
            content=pageRef.getContent();
        }  
        String vfContent = content.toString();
        Integer startPosition = vfContent.indexOf('Start_Of_Session_Id') + 'Start_Of_Session_Id'.length();
        Integer endPosition = vfContent.indexOf('End_Of_Session_Id');        
        sessionId = vfContent.substring(startPosition, endPosition);
        return sessionId;
    }
    
    @AuraEnabled
    public static List < String > getselectOptions(String objObject, string fld) {
        List < String > allOpts = new list < String > ();
        
        String query = 'Select '+ fld +' from '+ string.escapeSingleQuotes(objObject);
        List<SObject> objList = new List<SObject>();
        if (query != ''){
            objList = Database.query(query);
        }
        for(SObject p : objList){
            allOpts.add(String.valueOf(p.get(fld)));
        }
        allOpts.sort();
        return allOpts;
    }
    
    @AuraEnabled
    public static List < objectPermissions > getObjectPermissions(String profileName) {
        return [select Id, Parent.Profile.Name, SobjectType, PermissionsCreate, PermissionsDelete, PermissionsEdit,
                PermissionsModifyAllRecords, PermissionsRead, PermissionsViewAllRecords
                from ObjectPermissions WHERE Parent.Profile.Name =: profileName];
    }
    
    
    
    @AuraEnabled
    public static List < FieldPermissions > getFieldPermissions(String profileName,String objectName) {
        // System.debug('JVC'+objectName);
        if(objectName InstanceOf ID){
            Id ObjectId = (Id)objectName;
            objectName = ObjectId.getSObjectType().getDescribe().getName();
            if(objectName.equalsIgnoreCase('CustomEntityDefinition')){
                String body = toolingAPISOQL('Select Id, DeveloperName from CustomObject where id =\''+ObjectId+'\'');
                ProfileLayoutCls listProfiles = (ProfileLayoutCls) System.JSON.deserialize(body, ProfileLayoutCls.class);
                for(ProfileLayoutCls.cls_records record : listProfiles.records){
                    objectName = record.DeveloperName;
                    break;
                }
            }
            objectName += '__c';
        }
        
        
        // System.debug('JVC JVC'+ objectName );
        return [SELECT Id, Field, SObjectType, PermissionsRead, PermissionsEdit
                FROM FieldPermissions WHERE SObjectType=:objectName and parentId IN ( SELECT id FROM permissionset
                                                                                     WHERE PermissionSet.Profile.Name =: profileName)];
    }
    
    public static String restGet(String endPoint, String method, String sid) {
        Http h = new Http();
        HttpRequest hr = new HttpRequest();
        hr.setHeader('Authorization', 'Bearer ' + sid);
        hr.setTimeout(60000);
        hr.setEndpoint(endPoint);
        hr.setMethod(method);
        HttpResponse r = h.send(hr);
        return r.getBody();
    }
    public static String toolingAPISOQL( String query) {
        String baseURL = URL.getSalesforceBaseUrl().toExternalForm();
        return restGet( baseURL +'/services/data/v41.0/tooling/query?q='+ (query.replace(' ', '+')),
                       'GET', fetchUserSessionId());
    } 
    
    @AuraEnabled
    public static ProfileLayoutCls.cls_records[] getProfileLayout(String recordTypeName, String objectName) {
        Set<Id> setOfRecordTypeIds = new Set<Id>();
        Schema.SObjectType convertType = Schema.getGlobalDescribe().get(objectName);
        for(RecordTypeInfo info: convertType.getDescribe().getRecordTypeInfos()){
            if(info.isAvailable() && info.isActive()) {
                setOfRecordTypeIds.add(info.getRecordTypeId());
            }
        }
        
        String recordTypeIds = '';
        For(Id id : setOfRecordTypeIds){
            String id_in_quotes = '\''+id+'\'';
            if (recordTypeIds!='') { recordTypeIds += ','; }
            recordTypeIds += id_in_quotes;
        }
        if(string.isBlank(recordTypeIds)){
            recordTypeIds = ' (\'\')';
        }
        else{
            recordTypeIds = ' ('+recordTypeIds+')';
        }
        //system.debug(recordTypeIds);
        //String body = toolingAPISOQL('SELECT Layout.Name, Layout.TableEnumOrId, Profile.Name, ProfileId, RecordTypeId,RecordType.name FROM ProfileLayout WHERE Profile.Name=\''+recordTypeName+'\' AND Layout.TableEnumOrId=\''+objectName+'\'AND RecordTypeId = \'' + [Select RecordTypeId from Account].RecordTypeId + '\'');
        
        String body = toolingAPISOQL('SELECT Layout.Name, Layout.TableEnumOrId, Profile.Name, ProfileId, RecordTypeId,RecordType.name FROM ProfileLayout WHERE Profile.Name=\''+recordTypeName+'\' AND RecordTypeId IN '+recordTypeIds+' AND Layout.TableEnumOrId=\''+objectName+'\' ORDER BY RecordType.Name');
        ProfileLayoutCls listProfiles = (ProfileLayoutCls) System.JSON.deserialize(body, ProfileLayoutCls.class);
        //system.debug('listProfiles.records::'+listProfiles.records);
        return listProfiles.records;
    }
    
    @AuraEnabled
    public static List<String> getProfileNames(String tableName) {
        Set<String> names = new Set<String>();
        String body = '';
        
        body = toolingAPISOQL('SELECT Name FROM Profile');
        
        //system.debug('bodyyyyy::'+body);
        ProfileLayoutCls listProfiles = (ProfileLayoutCls) System.JSON.deserialize(body, ProfileLayoutCls.class);
        for(ProfileLayoutCls.cls_records record : listProfiles.records){
            names.add(record.name);
        }
        //system.debug('count::'+names.size());
        //system.debug('names::'+names);
        List<String> nameList = new List<String>();
        nameList.addAll(names);
        nameList.sort();
        return nameList;
    }
    
    //Added by Sagar Tumma: Modification ID ST-US288217
    @AuraEnabled
    public static List<String> getGroupNames(){
        List<String> uniqueList = new List<String>();
        List<Group> groupNames = [SELECT Name FROM Group WHERE Type = 'Regular'];
        Set<String> uniqueGroupName = new Set<String>();
        for(Group eachGroup : groupNames){
            uniqueGroupName.add(eachGroup.Name);
        }
        uniqueList.addAll(uniqueGroupName);
        uniqueList.sort();
        return uniqueList;
    }
    
    @AuraEnabled
    public static Map<String,String> getTableEnumOrId() {
        Map<String,String> allObjects = new Map<String,String>();
        List<String> standardObj = new List<String>{'Account','AccountContactRole','Asset','Campaign','CampaignMember',
            'Case','CaseComment','CaseContactRole','Contact','ContentVersion',
            'Contract','ContractContactRole','Event','Idea','KnowledgeArticle',
            'Lead','Opportunity','OpportunityContactRole','OpportunityLineItem','PartnerRole',
            'Product2','Question','Quote','QuoteLineItem','Reply','Site',
            'Solution','Task','Territory','User','UserLicense'};                
                for(String stdObj : standardObj){
                    allObjects.put(stdObj,stdObj);
                }
        
        String body = toolingAPISOQL('SELECT Id,DeveloperName,ManageableState FROM CustomObject WHERE ManageableState = \'unmanaged\' Order by DeveloperName ');
        //system.debug('body::'+body);
        if(!body.contains('not supported')){ 
            ProfileLayoutCls listProfiles = (ProfileLayoutCls) System.JSON.deserialize(body, ProfileLayoutCls.class);
            for(ProfileLayoutCls.cls_records record : listProfiles.records){
                allObjects.put(record.DeveloperName,record.Id);
            }
        }
        //system.debug('mapp::'+allObjects);
        return allObjects;
    }
    
    @AuraEnabled
    public static ProfileLayoutCls.cls_records[] getWorkflowRules (String objectName) {
        String body = toolingAPISOQL('SELECT Id,Name,ManageableState, NamespacePrefix,TableEnumOrId from WorkflowRule where TableEnumOrId = \''+objectName+'\'');
        ProfileLayoutCls listProfiles = (ProfileLayoutCls) System.JSON.deserialize(body, ProfileLayoutCls.class);
        //system.debug('listProfiles.records::'+listProfiles.records);
        return listProfiles.records;
    }
    
    @AuraEnabled
    public static ProfileLayoutCls.cls_records[] getValidationRules (String objectName) {
        String body = toolingAPISOQL('Select Id,ValidationName,Active,Description,ErrorDisplayField,EntityDefinition.QualifiedApiName, ErrorMessage From ValidationRule Where EntityDefinition.QualifiedApiName = \''+objectName+'\'');
        ProfileLayoutCls listProfiles = (ProfileLayoutCls) System.JSON.deserialize(body, ProfileLayoutCls.class);
        //system.debug('listProfiles.records::'+listProfiles.records);
        return listProfiles.records;
    }
    
    @AuraEnabled
    public static List <WebLink> getCustomButtons(String objectName){
        if(objectName InstanceOf ID){
            Id ObjectId = (Id)objectName;
            objectName = ObjectId.getSObjectType().getDescribe().getName();
            if(objectName.equalsIgnoreCase('CustomEntityDefinition')){
                String body = toolingAPISOQL('Select Id, DeveloperName from CustomObject where id =\''+ObjectId+'\'');
                ProfileLayoutCls listProfiles = (ProfileLayoutCls) System.JSON.deserialize(body, ProfileLayoutCls.class);
                for(ProfileLayoutCls.cls_records record : listProfiles.records){
                    objectName = record.DeveloperName;
                    break;
                }
            }
            objectName += '__c';
        }
        
        
        return [select id , Name, pageorsobjecttype,DisplayType, LinkType FROM WebLink where DisplayType IN ('B','L') and pageorsobjecttype =: objectName];
    }
    
    
    @AuraEnabled
    public static void getTasks() {
        String body = toolingAPISOQL('SELECT Id, (SELECT RelationId, Relation.Name, IsWhat FROM TaskRelations WHERE isWhat = false) FROM Task');
        //system.debug(body);
    }   
    
    
    @AuraEnabled
    public static List<String> getVisualforcePages (String objectName) {
        List<String> pageNames = new List<String>();
        //String objName = 'Account';
        // System.debug('ObjName:::' + objectName);
        
        if(objectName InstanceOf ID){
            Id ObjectId = (Id)objectName;
            objectName = ObjectId.getSObjectType().getDescribe().getName();
            if(objectName.equalsIgnoreCase('CustomEntityDefinition')){
                String body = toolingAPISOQL('Select Id, DeveloperName from CustomObject where id =\''+ObjectId+'\'');
                ProfileLayoutCls listProfiles = (ProfileLayoutCls) System.JSON.deserialize(body, ProfileLayoutCls.class);
                for(ProfileLayoutCls.cls_records record : listProfiles.records){
                    objectName = record.DeveloperName;
                    break;
                }
            }
            objectName += '__c';
        }
        for (ApexPage ap : [select Name, Markup from ApexPage]){
            
            if (ap.Markup.containsIgnoreCase('standardController="'+objectName+'"')) {
                pageNames.add(ap.Name);
            }
        }
        
        //System.debug('Found: ' + pageNames);
        return pageNames;
    }
    
    @AuraEnabled
    public static List<String> getFolderNames()
    {
        List<String> uniqueList = new List<String>();
        List<Report> folderNames = [Select folderName from Report];
        Set<String> uniqueFolderName = new Set<String>();
        for(Report r : folderNames){
            uniqueFolderName.add(r.folderName);
        }
        uniqueList.addAll(uniqueFolderName);
        uniqueList.sort();
        return uniqueList;
    }
    
    @AuraEnabled
    public static List<ReportInformation> getReportData(String folderName)
    {
        List<ReportInformation> reportInfos = new List<ReportInformation>();
        // system.debug('folderr::'+folderName);
        List<Report> reportList = [select Id,name, foldername from report where folderName =: folderName];
        for(Report rpt : reportList){
            Reports.ReportDescribeResult reportDescription = Reports.ReportManager.describeReport(rpt.id);
            Reports.ReportMetadata reportMetadata = reportDescription.getReportMetadata();
            Reports.ReportType rt = reportMetadata.getReportType();
            //System.debug(rt.getType());
            ReportInformation ri = new ReportInformation();
            ri.Id = rpt.id;
            ri.name = rpt.Name;
            ri.folderName = rpt.FolderName;
            ri.objectName = rt.getType();
            reportInfos.add(ri);
        }
        //system.debug('reportInfos:'+reportInfos);
        return reportInfos;
    }
    
    //Added by Sagar Tumma: Modification ID ST-US288217
    @AuraEnabled
    public static List<User> getGroupData(String groupName){
        
        List<User> userList = new List<User>();
        List<Group> groupList=  new List<Group>();
        Set<Id> innerGroupIdSet = new Set<Id>();
        Set<Id> directUserIdSet = new Set<Id>();
        Set<Id> regularInnerGroupIdSet = new Set<Id>();
        Set<Id> roleIdSet = new Set<Id>();
        Set<Id> roleOnlyIdSet = new Set<Id>();
        
        groupList = [SELECT Id, DeveloperName,Name,Type, (SELECT Id, UserOrGroupId FROM GroupMembers) FROM Group WHERE Name = :groupName];        
        //system.debug('**groupList **'+groupList);
        
        if(!groupList.isEmpty() && groupList.size()>0 ){
            for(Group eachGroup : groupList){
                if(eachGroup.GroupMembers.Size()>0){
                    for(GroupMember eachGroupMem: eachGroup.GroupMembers){
                        //system.debug('***Group Members ID ** '+eachGroupMem.Id + '  **Group Members UserOrGroupId **** '+eachGroupMem.UserOrGroupId);                       
                        if(String.valueOf(eachGroupMem.UserOrGroupId).startsWithIgnoreCase('005')){
                            directUserIdSet.add(eachGroupMem.UserOrGroupId);
                        }else if(String.valueOf(eachGroupMem.UserOrGroupId).startsWithIgnoreCase('00G')){                            
                            innerGroupIdSet.add(eachGroupMem.UserOrGroupId);
                        }             
                    }
                }         
            }
        }
        // system.debug('** directUserIdSet in getGroupData method ****  '+directUserIdSet);
        //system.debug('** innerGroupIdSet in getGroupData method ****  '+innerGroupIdSet);
        
        if(innerGroupIdSet.size()>0){
            for(Group eachGroup: [SELECT ID, RelatedId,Type FROM Group Where id IN :innerGroupIdSet]){        
                if(eachGroup.Type == 'Regular'){
                    regularInnerGroupIdSet.add(eachGroup.Id);
                } else if(eachGroup.RelatedId!= null && String.valueOf(eachGroup.RelatedId).startsWithIgnoreCase('00E')  && eachGroup.Type == 'Role'){
                    roleOnlyIdSet.add(eachGroup.RelatedId);
                } else if(eachGroup.RelatedId!= null && String.valueOf(eachGroup.RelatedId).startsWithIgnoreCase('00E') && (eachGroup.Type == 'RoleAndSubordinatesInternal' || eachGroup.Type == 'RoleAndSubordinates') ){
                    roleIdSet.add(eachGroup.RelatedId);
                }
            }
        }          
        //system.debug('** regularInnerGroupIdSet in getGroupData method ****  '+regularInnerGroupIdSet);
        //system.debug('** roleIdSet in getGroupData method ****  '+roleIdSet);
        
        Set<Id> allIdSet = getAllUserIdsAndRoleIdsFromSubGroups(regularInnerGroupIdSet);
        //system.debug('** allIdSet in getGroupData method ****'+allIdSet);
        
        if(allIdSet.size()>0){
            for(Id eachId: allIdSet ){            
                if(String.valueOf(eachId).startsWithIgnoreCase('00E')){
                    //system.debug('******Role Id ****  '+eachId);
                    roleIdSet.add(eachId);
                }else if(String.valueOf(eachId).startsWithIgnoreCase('005')){
                    //system.debug('******User Id ****   '+eachId);
                    directUserIdSet.add(eachId);
                }             
            }
        }
        
        //system.debug('** Final directUserIdSet in getGroupData method  ****  '+directUserIdSet);
        //system.debug('** Final roleIdSet in getGroupData method ****  '+roleIdSet);
        
        // get all of the roles underneath the user
        Set<Id> allSubRoleIds = getAllSubRoleIds(roleIdSet);       
        //system.debug('**** Total roles in getGroupData method  allSubRoleIds **  '+allSubRoleIds);
        allSubRoleIds.addAll(roleOnlyIdSet);
        allSubRoleIds.addAll(roleIdSet);
        // get all of the ids for the users in those roles        
        userList = [SELECT id, Name,isActive,UserRole.Name,UserRoleId, Profile.Name, ProfileId FROM User where UserRoleId IN :allSubRoleIds OR Id IN : directUserIdSet];
        // system.debug('** Final Size of userList in getGroupData method ***  '+UserList.Size());
        
        return UserList;
    }
    
    //Added by Sagar Tumma: Modification ID ST-US288217
    public static Set<ID> getAllUserIdsAndRoleIdsFromSubGroups(Set<ID> regularInnerGroupIdSet) {
        List<Group> subGroupList = new List<Group>();
        Set<Id> directUserIds = new Set<Id>();
        Set<Id> innerGroupIdSet = new Set<Id>();
        Set<Id> allIds = new Set<Id>();
        Set<Id> regularInnerGroupIdsSet = new Set<Id>();
        
        //system.debug('**** regularInnerGroupIdSet sent from getGroupData to getAllUserIdsAndRoleIdsFromSubGroups method **  '+regularInnerGroupIdSet);
        
        subGroupList = [SELECT Id, DeveloperName,Name,Type, (SELECT Id, UserOrGroupId FROM GroupMembers) FROM Group WHERE Id IN :regularInnerGroupIdSet];
        //system.debug('**** subGroupList after query in getAllSubGroupIds method **  '+subGroupList);
        
        if(subGroupList.size()>0){
            for(Group eachGroup : subGroupList){
                if(eachGroup.GroupMembers.size()>0){
                    for(GroupMember eachGroupMem: eachGroup.GroupMembers){                        
                        if(String.valueOf(eachGroupMem.UserOrGroupId).startsWithIgnoreCase('005')){                            
                            allIds.add(eachGroupMem.UserOrGroupId);
                        }                        
                        if(String.valueOf(eachGroupMem.UserOrGroupId).startsWithIgnoreCase('00G')){                            
                            innerGroupIdSet.add(eachGroupMem.UserOrGroupId);
                        }             
                    }
                }         
            }
        }
        if(innerGroupIdSet.Size()>0){
            for(Group eachGroup: [SELECT ID, RelatedId,Type FROM Group Where id IN :innerGroupIdSet]){            
                if(eachGroup.Type== 'Regular'){
                    regularInnerGroupIdsSet.add(eachGroup.Id);
                }            
                if(eachGroup.RelatedId!= null && String.valueOf(eachGroup.RelatedId).startsWithIgnoreCase('00E')){                   
                    allIds.add(eachGroup.RelatedId);
                }
            }
        }
        if(regularInnerGroupIdsSet.size()>0){            
            allIds.addAll(getAllUserIdsAndRoleIdsFromSubGroups(regularInnerGroupIdsSet));            
        }
        return allIds;
    }
    
    //Added by Sagar Tumma: Modification ID ST-US288217
    public static Set<ID> getAllSubRoleIds(Set<ID> roleIds) {
        
        Set<Id> currentRoleIds = new Set<Id>();        
        
        // get all of the roles underneath the passed roles
        for(UserRole userRole :[SELECT Id FROM UserRole WHERE ParentRoleId IN :roleIds AND ParentRoleID != null])
            currentRoleIds.add(userRole.Id);
        
        // go fetch some more roles!
        if(currentRoleIds.size() > 0){
            currentRoleIds.addAll(getAllSubRoleIds(currentRoleIds));
        }      
        
        return currentRoleIds;
        
    }
    
    @AuraEnabled
    public static List<Dashboard> getDashboardData(String folderName)
    {
        List<Dashboard> dashboards = null;
        if(folderName.equalsIgnoreCase('--All--')){
            dashboards = [select Id,DeveloperName, FolderName from Dashboard];
        }else{
            dashboards = [select Id,DeveloperName, FolderName from Dashboard where FolderName =:folderName];
        }
        return dashboards;
    }
    
    
    @AuraEnabled
    public static List<String> getDashboardFolderNames()
    {
        List<String> uniqueList = new List<String>();
        List<Dashboard> folderNames = [Select folderName from Dashboard];
        Set<String> uniqueFolderName = new Set<String>();
        for(Dashboard r : folderNames){
            uniqueFolderName.add(r.folderName);
        }
        uniqueList.addAll(uniqueFolderName);
        uniqueList.sort();
        return uniqueList;
    }
    
    @AuraEnabled
    public static ProcessBuilderMetaData.cls_records[] getProcessBuilders () {
        String body = toolingAPISOQL('Select+Id,ActiveVersion.VersionNumber,LatestVersion.VersionNumber,DeveloperName+From+FlowDefinition');
        ProcessBuilderMetaData listProcessBuilder = (ProcessBuilderMetaData) System.JSON.deserialize(body, ProcessBuilderMetaData.class);
        //system.debug('listProcessBuilder.records::'+listProcessBuilder);
        return listProcessBuilder.records;
    }
}