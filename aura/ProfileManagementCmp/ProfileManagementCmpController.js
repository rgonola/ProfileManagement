({
    doInit: function(component, event, helper) {
        helper.fetchProfiles(component, 'Name', '');
    },
    showSpinner: function(component, event, helper) {
        component.set("v.spinner", true); 
    },
    hideSpinner : function(component,event,helper){  
        component.set("v.spinner", false);
    },
    onPicklistChange: function(component, event, helper) {
        var profileName = component.find("profileName").get("v.value");
        component.set("v.selectedObjPerm",profileName);
    },
    onPicklistChange1: function(component, event, helper) {
        var profileName1 = component.find("profileName1").get("v.value");
        component.set("v.selectedfldPerm",profileName1);
    },
    onTableNameChange1: function(component, event, helper) {
        var tableName1 = component.find("tableName1").get("v.value");
        component.set("v.selectedTable",tableName1);
    },
    
    onLayoutNameChange: function(component, event, helper) {
        var layoutName = component.find("layoutName").get("v.value");
        var resetValues = [];
        component.set("v.selectedLayout",layoutName);
        component.set("v.profileLayouts",resetValues);
    },
    onTableNameChange: function(component, event, helper) {
        var tableName = component.find("tableName").get("v.value");
        component.set("v.selectedTable",tableName);
        var resetValues = [];
        component.set("v.profileLayouts",resetValues);
    },
    
    onObjectChangeforWofkflow: function(component, event, helper){
        var tableName = component.find("objectNameWF").get("v.value");
        component.set("v.selectedTable",tableName);
        var resetValues = [];
        component.set("v.worflows",resetValues); 
    },
    
    onObjectChangeforValidationR: function(component, event, helper) {
        var tableName = component.find("objectNameVR").get("v.value");
    	component.set("v.selectedTable",tableName);
        var resetValues = [];
        component.set("v.validationRules",resetValues);
    },
    
    
     onObjectChangeforButton: function(component, event, helper) {
        var tableName = component.find("objectNameButton").get("v.value");
    	component.set("v.selectedTable",tableName);
        var resetValues = [];
        component.set("v.customButtons",resetValues); 
    },
    onObjectChangeforVF :function(component, event, helper) {
        var tableName = component.find("objectNameVF").get("v.value");
    	component.set("v.selectedTable",tableName);
        var resetValues = [];
        component.set("v.apexPages",resetValues);
    },
    
    onFolderChangeforReport : function(component, event, helper){
        var folderName = component.find("report").get("v.value");
        component.set("v.selectedFolder",folderName);
        var resetValues = [];
        component.set("v.reportData",resetValues); 
    },
    
    onNameChangeforGroup: function(component, event, helper) {
        var groupName = component.find("groupName").get("v.value");
    	component.set("v.selectedGroup",groupName);
        var resetValues = [];
        component.set("v.groupUserData",resetValues);
    },
    
    onFolderChangeforDashboard : function(component, event, helper){
        var folderName = component.find("dashboard").get("v.value");
        component.set("v.selectedDahboardFolder",folderName);
        var resetValues = [];
        component.set("v.dashboardData",resetValues); 
    },
    
    onTabSelected: function(component, event, helper) {
        if(component.get("v.selTabId") === 'tab1'){
            helper.fetchProfiles(component,'layoutName','');
        } else if(component.get("v.selTabId") === 'tab2'){
            helper.fetchProfiles(component, 'Name', '');
            helper.fetchTables(component,'tableName1');
        } else if(component.get("v.selTabId") === 'tab3'){
            helper.fetchTables(component,'tableName');
            helper.fetchProfiles(component,'layoutName','');
        } else if(component.get("v.selTabId") === 'tab4'){
           helper.fetchTables(component,'objectNameWF',''); 
    	} else if(component.get("v.selTabId") === 'tab5'){
           helper.fetchTables(component,'objectNameVR','');
        }else if(component.get("v.selTabId") === 'tab6'){
           helper.fetchTables(component,'objectNameButton','');
        }else if(component.get("v.selTabId") === 'tab7'){
           helper.fetchTables(component,'objectNameVF','');
        }else if(component.get("v.selTabId") === 'tab8'){
           helper.fetchFolders(component,'report','');
        }else if(component.get("v.selTabId") === 'tab9'){
           helper.fetchDashboardFolders(component,'dashboard','');
            //helper.fetchDashboards(component);
        }else if(component.get("v.selTabId") === 'tab11'){
            helper.fetchGroupNames(component,'groupName','');
        }
    },
    
    onObjectPermDisplay : function(component, event, helper) {
        var selObjPerm = component.get("v.selectedObjPerm");
        if (!$A.util.isUndefinedOrNull(selObjPerm)) {
            helper.fetchObjectPermissions(component, selObjPerm);
        }else{
            alert('Nothing to display!');
        }
    },
    
    onFldPermDisplay : function(component, event, helper) {
        var selfldPerm = component.get("v.selectedfldPerm");
        var selTable = component.get("v.selectedTable");
        if (!$A.util.isUndefinedOrNull(selfldPerm) && !$A.util.isUndefinedOrNull(selTable)) {
            helper.fetchFieldPermissions(component, selfldPerm, selTable);
        }else{
            alert('Nothing to display!');
        }
    },
    
    onProfileLayouDisplay : function(component, event, helper) {
        var selLay = component.get("v.selectedLayout");
        var selTable = component.get("v.selectedTable");
        if (!$A.util.isUndefinedOrNull(selLay) && !$A.util.isUndefinedOrNull(selTable)) {
            helper.fetchProfileLayoutData(component, selLay, selTable);
        }
    },
    
    onProcessBuilderDisplay : function(component, event, helper) {
        helper.fetchProcessBuilderData(component);

    },

    onWorkFlowDisplay : function(component, event, helper) {
        var selTable = component.get("v.selectedTable");
        if (!$A.util.isUndefinedOrNull(selTable)) {
            helper.fetchWorkflowRuleData(component,selTable);
        }else{
            alert('Nothing to display!');
        }
    },
    
    onReportDisplay : function(component, event, helper) {
        var selectedFolder = component.get("v.selectedFolder");
        if (!$A.util.isUndefinedOrNull(selectedFolder)) {
            helper.fetchReports(component,selectedFolder);
        }else{
            alert('Nothing to display!');
        }
    },
    
    onGroupDisplay : function(component, event, helper) {
        var selectedGroup = component.get("v.selectedGroup");
        if (!$A.util.isUndefinedOrNull(selectedGroup)) {
            helper.fetchGroupUsers(component,selectedGroup);
        }else{
            alert('Nothing to display!');
        }
    },
    
    onDashboardDisplay : function(component, event, helper) {
        var selectedFolder = component.get("v.selectedDahboardFolder");
        if (!$A.util.isUndefinedOrNull(selectedFolder)) {
            helper.fetchDashboards(component,selectedFolder);
        }else{
            alert('Nothing to display!');
        }
    },
    
    onValidationRuleDisplay : function(component, event, helper) {
        var selTable = component.get("v.selectedTable");
        if (!$A.util.isUndefinedOrNull(selTable)) {
           
            helper.fetchValidationRuleData(component,selTable);
        }else{
            alert('Nothing to display!');
        }
    },
    
     onButtonDisplay : function(component, event, helper) {
        var selTable = component.get("v.selectedTable");
        if (!$A.util.isUndefinedOrNull(selTable)) {
            helper.fetchObjectButtons(component,selTable);
          
        }else{
            alert('Nothing to display!');
        }
    },
    
    onVFDisplay : function(component, event, helper) {
        var selTable = component.get("v.selectedTable");
        console.log(selTable + 'in onvfdisp');
        if (!$A.util.isUndefinedOrNull(selTable)) {
            helper.fetchObjectVFs(component,selTable);
          
        }else{
            alert('Nothing to display!');
        }
    },
    
    exportCsv : function(component, event, helper) {
        var lstobjectPermissions = component.get("v.objectPermissions");
        if(lstobjectPermissions.length > 0){
            var data = [];
            var headerArray = [];
            var csvContentArray = [];
            
            //Fill out the Header of CSV
            headerArray.push('S.No');
            headerArray.push('Parent.Profile.Name');
            headerArray.push('SobjectType');
            headerArray.push('PermissionsCreate');
            headerArray.push('PermissionsDelete');
            headerArray.push('PermissionsEdit');
            headerArray.push('PermissionsModifyAllRecords');
            headerArray.push('PermissionsRead');
            headerArray.push('PermissionsViewAllRecords');
            data.push(headerArray);
            
            var sno = 0;
            for(var i=0;i<lstobjectPermissions.length;i++){
                //Initialize the temperory array
                var tempArray = [];
                //use parseInt to perform math operation
                sno = parseInt(sno) + parseInt(1);
                tempArray.push('"'+sno+'"');
                tempArray.push('"'+lstobjectPermissions[i].Parent.Profile.Name+'"');
                tempArray.push('"'+lstobjectPermissions[i].SobjectType+'"');
                tempArray.push('"'+lstobjectPermissions[i].PermissionsCreate+'"');
                tempArray.push('"'+lstobjectPermissions[i].PermissionsDelete+'"');
                tempArray.push('"'+lstobjectPermissions[i].PermissionsEdit+'"');
                tempArray.push('"'+lstobjectPermissions[i].PermissionsModifyAllRecords+'"');
                tempArray.push('"'+lstobjectPermissions[i].PermissionsRead+'"');
                tempArray.push('"'+lstobjectPermissions[i].PermissionsViewAllRecords+'"');
                data.push(tempArray);   
            }
            
            for(var j=0;j<data.length;j++){
                var dataString = data[j].join(",");
                csvContentArray.push(dataString);
            }
            
            var csvContent = csvContentArray.join("\r\n");
            
            //Generate a file name
            var fileName = "Object Permissions_";
            //this will remove the blank-spaces from the title and replace it with an underscore
            fileName += new Date().toUTCString();
            fileName += ".csv";
            //Initialize file format you want csv or xls
            var uri = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent);
            
            if (navigator.msSaveBlob) { // IE 10+
                var blob = new Blob([csvContent],{type: "text/csv;charset=utf-8;"});
                navigator.msSaveBlob(blob, fileName);
            }
            else{
                var link = document.createElement("a");
                link.setAttribute('download',fileName);
                link.href = uri;
                link.style = "visibility:hidden";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }else{
            alert('Nothing to export!');
        }
    },
    
    exportFieldPermissionCsv : function(component, event, helper) {
        var lstfieldPermissions = component.get("v.fieldPermissions");
        if(lstfieldPermissions.length > 0){
            var data = [];
            var headerArray = [];
            var csvContentArray = [];
            
            //Fill out the Header of CSV
            headerArray.push('S.No');
            headerArray.push('Field');
            headerArray.push('SobjectType');
            headerArray.push('PermissionsEdit');
            headerArray.push('PermissionsRead');
            data.push(headerArray);
            
            var sno = 0;
            for(var i=0;i<lstfieldPermissions.length;i++){
                //Initialize the temperory array
                var tempArray = [];
                //use parseInt to perform math operation
                sno = parseInt(sno) + parseInt(1);
                tempArray.push('"'+sno+'"');
                tempArray.push('"'+lstfieldPermissions[i].Field+'"');
                tempArray.push('"'+lstfieldPermissions[i].SobjectType+'"');
                tempArray.push('"'+lstfieldPermissions[i].PermissionsEdit+'"');
                tempArray.push('"'+lstfieldPermissions[i].PermissionsRead+'"');
                data.push(tempArray);   
            }
            
            for(var j=0;j<data.length;j++){
                var dataString = data[j].join(",");
                csvContentArray.push(dataString);
            }
            
            var csvContent = csvContentArray.join("\r\n");
            //var csvContent = CSV + csvContentArray.join("rn");
            
            //Generate a file name
            var fileName = "Field Permissions_";
            //this will remove the blank-spaces from the title and replace it with an underscore
            fileName += new Date().toUTCString();
            fileName += ".csv";
            //Initialize file format you want csv or xls
            var uri = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent);
            
            if (navigator.msSaveBlob) { // IE 10+
                var blob = new Blob([csvContent],{type: "text/csv;charset=utf-8;"});
                navigator.msSaveBlob(blob, fileName);
            }
            else{
                var link = document.createElement("a");
                link.setAttribute('download',fileName);
                link.href = uri;
                link.style = "visibility:hidden";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }else{
            alert('Nothing to export!');
        }
    },
    
    exportProfileLayoutCsv : function(component, event, helper) {
        var lstprofileLayouts = component.get("v.profileLayouts");
        if(lstprofileLayouts.length > 0){
            var data = [];
            var headerArray = [];
            var csvContentArray = [];
            
            //Fill out the Header of CSV
            headerArray.push('S.No');
            headerArray.push('RecordTypeId');
            headerArray.push('RecordType.Name');
            headerArray.push('Layout.Name');
            headerArray.push('Layout.TableEnumOrId');
            headerArray.push('ProfileId');
            headerArray.push('Profile.Name');
            
            data.push(headerArray);
            
            console.log('layout::'+JSON.stringify(lstprofileLayouts[0].Layout));
            console.log('profile::'+JSON.stringify(lstprofileLayouts[0].Profile));
            var sno = 0;
            for(var i=0;i<lstprofileLayouts.length;i++){
                //Initialize the temperory array
                var tempArray = [];
                //use parseInt to perform math operation
                sno = parseInt(sno) + parseInt(1);
                tempArray.push('"'+sno+'"');
                 if(!$A.util.isUndefinedOrNull(lstprofileLayouts[i].RecordTypeId)){
                   // tempArray.push('"'+JSON.stringify(lstprofileLayouts[i].RecordTypeId)+'"');
                   tempArray.push('"'+lstprofileLayouts[i].RecordTypeId+'"');
                    tempArray.push('"'+lstprofileLayouts[i].RecordType.Name+'"');
                }
                
                if(!$A.util.isUndefinedOrNull(lstprofileLayouts[i].Layout)){
                    tempArray.push('"'+lstprofileLayouts[i].Layout.Name+'"');
                    tempArray.push('"'+lstprofileLayouts[i].Layout.TableEnumOrId+'"');
                }
                
                if(!$A.util.isUndefinedOrNull(lstprofileLayouts[i].ProfileId)){
                  //  tempArray.push('"'+JSON.stringify(lstprofileLayouts[i].ProfileId)+'"');
                  tempArray.push('"'+lstprofileLayouts[i].ProfileId+'"');
                  
                }
                
                if(!$A.util.isUndefinedOrNull(lstprofileLayouts[i].Profile)){
                  //  tempArray.push('"'+JSON.stringify(lstprofileLayouts[i].Profile.Name)+'"');
                  tempArray.push('"'+lstprofileLayouts[i].Profile.Name+'"');
                }
               
                
                data.push(tempArray);   
            }
            
            for(var j=0;j<data.length;j++){
                var dataString = data[j].join(",");
                csvContentArray.push(dataString);
            }
            
            var csvContent = csvContentArray.join("\r\n");
            //var csvContent = CSV + csvContentArray.join("rn");
            
            //Generate a file name
            var fileName = "ProfileLayout_";
            //this will remove the blank-spaces from the title and replace it with an underscore
            fileName += new Date().toUTCString();
            fileName += ".csv";
            //Initialize file format you want csv or xls
            var uri = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent);
            
            if (navigator.msSaveBlob) { // IE 10+
                var blob = new Blob([csvContent],{type: "text/csv;charset=utf-8;"});
                navigator.msSaveBlob(blob, fileName);
            }
            else{
                var link = document.createElement("a");
                link.setAttribute('download',fileName);
                link.href = uri;
                link.style = "visibility:hidden";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }else{
            alert('Nothing to export!');
        }
    },
    
    exportProcessBuilderCsv : function(component, event, helper) {
        var lstprofileLayouts = component.get("v.processBuilders");
        if(lstprofileLayouts.length > 0){
            var data = [];
            var headerArray = [];
            var csvContentArray = [];
            
            //Fill out the Header of CSV
            headerArray.push('S.No');
            headerArray.push('Id');
            headerArray.push('ActiveVersion');
            headerArray.push('LatestVersion');
            headerArray.push('DeveloperName');
            
            data.push(headerArray);
            var sno = 0;
            for(var i=0;i<lstprofileLayouts.length;i++){
                //Initialize the temperory array
                var tempArray = [];
                //use parseInt to perform math operation
                sno = parseInt(sno) + parseInt(1);
                tempArray.push('"'+sno+'"');
                tempArray.push('"'+lstprofileLayouts[i].Id+'"');
                if(!$A.util.isUndefinedOrNull(lstprofileLayouts[i].ActiveVersion)){
                    tempArray.push('"'+lstprofileLayouts[i].ActiveVersion.VersionNumber+'"');
                }else{
                    tempArray.push('"Inactive"');
                }
            tempArray.push('"'+lstprofileLayouts[i].LatestVersion.VersionNumber+'"');
            tempArray.push('"'+lstprofileLayouts[i].DeveloperName+'"');
            data.push(tempArray);   
        }
            
            for(var j=0;j<data.length;j++){
                var dataString = data[j].join(",");
                csvContentArray.push(dataString);
            }
            
            var csvContent = csvContentArray.join("\r\n");
            var fileName = "ProcessBuilder_";
            //this will remove the blank-spaces from the title and replace it with an underscore
            fileName += new Date().toUTCString();
            fileName += ".csv";
            //Initialize file format you want csv or xls
            var uri = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent);
            
            if (navigator.msSaveBlob) { // IE 10+
                var blob = new Blob([csvContent],{type: "text/csv;charset=utf-8;"});
                navigator.msSaveBlob(blob, fileName);
            }
            else{
                var link = document.createElement("a");
                link.setAttribute('download',fileName);
                link.href = uri;
                link.style = "visibility:hidden";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }else{
            alert('Nothing to export!');
        }
    },
    
    exportWorkflowCsv : function(component, event, helper) {
        var lstfieldPermissions = component.get("v.worflows");
        if(lstfieldPermissions.length > 0){
            var data = [];
            var headerArray = [];
            var csvContentArray = [];
            
            //Fill out the Header of CSV
            headerArray.push('S.No');
            headerArray.push('Id');
            headerArray.push('Name');
            headerArray.push('ManageableState');
            headerArray.push('NamespacePrefix');
            headerArray.push('TableEnumOrId');
            data.push(headerArray);
            
            var sno = 0;
            for(var i=0;i<lstfieldPermissions.length;i++){
                //Initialize the temperory array
                var tempArray = [];
                //use parseInt to perform math operation
                sno = parseInt(sno) + parseInt(1);
                tempArray.push('"'+sno+'"');
                tempArray.push('"'+lstfieldPermissions[i].Id+'"');
                tempArray.push('"'+lstfieldPermissions[i].Name+'"');
                tempArray.push('"'+lstfieldPermissions[i].ManageableState+'"');
                if(!$A.util.isUndefinedOrNull(lstfieldPermissions[i].NamespacePrefix)){
                    tempArray.push('"'+lstfieldPermissions[i].NamespacePrefix+'"');
                }else{
                    tempArray.push('" - "');
                }
                
                tempArray.push('"'+lstfieldPermissions[i].TableEnumOrId+'"');
                data.push(tempArray);   
            }
            
            for(var j=0;j<data.length;j++){
                var dataString = data[j].join(",");
                csvContentArray.push(dataString);
            }
            
            var csvContent = csvContentArray.join("\r\n");
            //var csvContent = CSV + csvContentArray.join("rn");
            
            //Generate a file name
            var fileName = "Workflow_";
            //this will remove the blank-spaces from the title and replace it with an underscore
            fileName += new Date().toUTCString();
            fileName += ".csv";
            //Initialize file format you want csv or xls
            var uri = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent);
            
            if (navigator.msSaveBlob) { // IE 10+
                var blob = new Blob([csvContent],{type: "text/csv;charset=utf-8;"});
                navigator.msSaveBlob(blob, fileName);
            }
            else{
                var link = document.createElement("a");
                link.setAttribute('download',fileName);
                link.href = uri;
                link.style = "visibility:hidden";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }else{
            alert('Nothing to export!');
        }
    },
    
    exportReportCsv : function(component, event, helper) {
        var lstfieldPermissions = component.get("v.reportData");
        if(lstfieldPermissions.length > 0){
            var data = [];
            var headerArray = [];
            var csvContentArray = [];
            
            //Fill out the Header of CSV
            headerArray.push('S.No');
            headerArray.push('Id');
            headerArray.push('Name');
            headerArray.push('Folder Name');
            headerArray.push('Object Name');
            data.push(headerArray);
            
            var sno = 0;
            for(var i=0;i<lstfieldPermissions.length;i++){
                //Initialize the temperory array
                var tempArray = [];
                //use parseInt to perform math operation
                sno = parseInt(sno) + parseInt(1);
                tempArray.push('"'+sno+'"');
                tempArray.push('"'+lstfieldPermissions[i].Id+'"');
                tempArray.push('"'+lstfieldPermissions[i].name+'"');
                tempArray.push('"'+lstfieldPermissions[i].folderName+'"');
                tempArray.push('"'+lstfieldPermissions[i].objectName+'"');
                data.push(tempArray);   
            }
            
            for(var j=0;j<data.length;j++){
                var dataString = data[j].join(",");
                csvContentArray.push(dataString);
            }
            
            var csvContent = csvContentArray.join("\r\n");
            //var csvContent = CSV + csvContentArray.join("rn");
            
            //Generate a file name
            var fileName = "Reports_";
            //this will remove the blank-spaces from the title and replace it with an underscore
            fileName += new Date().toUTCString();
            fileName += ".csv";
            //Initialize file format you want csv or xls
            var uri = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent);
            
            if (navigator.msSaveBlob) { // IE 10+
                var blob = new Blob([csvContent],{type: "text/csv;charset=utf-8;"});
                navigator.msSaveBlob(blob, fileName);
            }
            else{
                var link = document.createElement("a");
                link.setAttribute('download',fileName);
                link.href = uri;
                link.style = "visibility:hidden";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }else{
            alert('Nothing to export!');
        }
    },
    
    exportGroupUsersCsv : function(component, event, helper) {
        var lstfieldPermissions = component.get("v.groupUserData");
        console.log(JSON.stringify(component.get("v.groupUserData")));
        if(lstfieldPermissions.length > 0){
            var data = [];
            var headerArray = [];
            var csvContentArray = [];
            
            //Fill out the Header of CSV
            headerArray.push('S.No');
            headerArray.push('Id');
            headerArray.push('User Name');
            headerArray.push('Active');
            headerArray.push('Role');
            headerArray.push('Profile');
            data.push(headerArray);
            
            var sno = 0;
            for(var i=0;i<lstfieldPermissions.length;i++){
                //Initialize the temperory array
                var tempArray = [];
                //use parseInt to perform math operation
                sno = parseInt(sno) + parseInt(1);
                tempArray.push('"'+sno+'"');
                tempArray.push('"'+lstfieldPermissions[i].Id+'"');
                tempArray.push('"'+lstfieldPermissions[i].Name+'"');
                tempArray.push('"'+lstfieldPermissions[i].IsActive+'"');
                tempArray.push('"'+lstfieldPermissions[i].UserRole.Name+'"');
                tempArray.push('"'+lstfieldPermissions[i].Profile.Name+'"');
                data.push(tempArray);   
            }
            
            for(var j=0;j<data.length;j++){
                var dataString = data[j].join(",");
                csvContentArray.push(dataString);
            }
            
            var csvContent = csvContentArray.join("\r\n");
            //var csvContent = CSV + csvContentArray.join("rn");
            
            //Generate a file name
            var fileName = component.find("groupName").get("v.value")+" Group Users_";
            //this will remove the blank-spaces from the title and replace it with an underscore
            fileName += new Date().toUTCString();
            fileName += ".csv";
            //Initialize file format you want csv or xls
            var uri = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent);
            
            if (navigator.msSaveBlob) { // IE 10+
                var blob = new Blob([csvContent],{type: "text/csv;charset=utf-8;"});
                navigator.msSaveBlob(blob, fileName);
            }
            else{
                var link = document.createElement("a");
                link.setAttribute('download',fileName);
                link.href = uri;
                link.style = "visibility:hidden";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }else{
            alert('Nothing to export!');
        }
    },
    exportVRuleCsv : function(component, event, helper) {
        var lstfieldPermissions = component.get("v.validationRules");
        if(lstfieldPermissions.length > 0){
            var data = [];
            var headerArray = [];
            var csvContentArray = [];
            
            //Fill out the Header of CSV
            headerArray.push('S.No');
            headerArray.push('Id');
            headerArray.push('ValidationName');
            headerArray.push('Active');
            headerArray.push('Description');
            headerArray.push('ErrorDisplayField');
            headerArray.push('EntityDefinition.QualifiedApiName');
            headerArray.push('ErrorMessage');
            data.push(headerArray);
            
            var sno = 0;
            for(var i=0;i<lstfieldPermissions.length;i++){
                //Initialize the temperory array
                var tempArray = [];
                //use parseInt to perform math operation
                sno = parseInt(sno) + parseInt(1);
                tempArray.push('"'+sno+'"');
                tempArray.push('"'+lstfieldPermissions[i].Id+'"');
                tempArray.push('"'+lstfieldPermissions[i].ValidationName+'"');
                tempArray.push('"'+lstfieldPermissions[i].Active+'"');
                tempArray.push('"'+lstfieldPermissions[i].Description+'"');
                tempArray.push('"'+lstfieldPermissions[i].ErrorDisplayField+'"');
                tempArray.push('"'+lstfieldPermissions[i].EntityDefinition.QualifiedApiName+'"');
                tempArray.push('"'+lstfieldPermissions[i].ErrorMessage+'"');
                
                data.push(tempArray);   
            }
            
            for(var j=0;j<data.length;j++){
                var dataString = data[j].join(",");
                csvContentArray.push(dataString);
            }
            
            var csvContent = csvContentArray.join("\r\n");
            //var csvContent = CSV + csvContentArray.join("rn");
            
            //Generate a file name
            var fileName = "Validation Rule_";
            //this will remove the blank-spaces from the title and replace it with an underscore
            fileName += new Date().toUTCString();
            fileName += ".csv";
            //Initialize file format you want csv or xls
            var uri = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent);
            
            if (navigator.msSaveBlob) { // IE 10+
                var blob = new Blob([csvContent],{type: "text/csv;charset=utf-8;"});
                navigator.msSaveBlob(blob, fileName);
            }
            else{
                var link = document.createElement("a");
                link.setAttribute('download',fileName);
                link.href = uri;
                link.style = "visibility:hidden";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }else{
            alert('Nothing to export!');
        }
    },
            
   exportButtonCsv : function(component, event, helper) {
        var lstfieldPermissions= component.get("v.customButtons");
        if(lstfieldPermissions.length > 0){
            var data = [];
            var headerArray = [];
            var csvContentArray = [];
            
            //Fill out the Header of CSV
            headerArray.push('S.No');
            headerArray.push('Id');
            headerArray.push('Button Name');
            headerArray.push('Object');
            headerArray.push('Display Type');
            headerArray.push('Link Type');
            
            data.push(headerArray);
            
            var sno = 0;
            for(var i=0;i<lstfieldPermissions.length;i++){
                //Initialize the temperory array
                var tempArray = [];
                //use parseInt to perform math operation
                sno = parseInt(sno) + parseInt(1);
                tempArray.push('"'+sno+'"');
                tempArray.push('"'+lstfieldPermissions[i].Id+'"');
                tempArray.push('"'+lstfieldPermissions[i].Name+'"');
                tempArray.push('"'+lstfieldPermissions[i].PageOrSobjectType+'"');
                tempArray.push('"'+lstfieldPermissions[i].DisplayType+'"');
                tempArray.push('"'+lstfieldPermissions[i].LinkType+'"');
               
                
                data.push(tempArray);   
            }
            
            for(var j=0;j<data.length;j++){
                var dataString = data[j].join(",");
                csvContentArray.push(dataString);
            }
            
            var csvContent = csvContentArray.join("\r\n");
            //var csvContent = CSV + csvContentArray.join("rn");
            
            //Generate a file name
            var fileName = "Button_";
            //this will remove the blank-spaces from the title and replace it with an underscore
            fileName += new Date().toUTCString();
            fileName += ".csv";
            //Initialize file format you want csv or xls
            var uri = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent);
            
            if (navigator.msSaveBlob) { // IE 10+
                var blob = new Blob([csvContent],{type: "text/csv;charset=utf-8;"});
                navigator.msSaveBlob(blob, fileName);
            }
            else{
                var link = document.createElement("a");
                link.setAttribute('download',fileName);
                link.href = uri;
                link.style = "visibility:hidden";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }else{
            alert('Nothing to export!');
        }      
    },
    
    
    exportVFCsv : function(component, event, helper) {
        var lstfieldPermissions= component.get("v.apexPages");
        if(lstfieldPermissions.length > 0){
            var data = [];
            var headerArray = [];
            var csvContentArray = [];
            
            //Fill out the Header of CSV
            headerArray.push('S.No');
            headerArray.push('Page Name');
           
            
            data.push(headerArray);
            
            var sno = 0;
            for(var i=0;i<lstfieldPermissions.length;i++){
                //Initialize the temperory array
                var tempArray = [];
                //use parseInt to perform math operation
                sno = parseInt(sno) + parseInt(1);
                tempArray.push('"'+sno+'"');
                
                tempArray.push('"'+lstfieldPermissions[i]+'"');
                               
                
                data.push(tempArray);   
            }
            
            for(var j=0;j<data.length;j++){
                var dataString = data[j].join(",");
                csvContentArray.push(dataString);
            }
            
            var csvContent = csvContentArray.join("\r\n");
            //var csvContent = CSV + csvContentArray.join("rn");
            
            //Generate a file name
            var fileName = "VisualForce Pages_";
            //this will remove the blank-spaces from the title and replace it with an underscore
            fileName += new Date().toUTCString();
            fileName += ".csv";
            //Initialize file format you want csv or xls
            var uri = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent);
            
            if (navigator.msSaveBlob) { // IE 10+
                var blob = new Blob([csvContent],{type: "text/csv;charset=utf-8;"});
                navigator.msSaveBlob(blob, fileName);
            }
            else{
                var link = document.createElement("a");
                link.setAttribute('download',fileName);
                link.href = uri;
                link.style = "visibility:hidden";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }else{
            alert('Nothing to export!');
        }      
    },
    
    
    exportDashboardCsv : function(component, event, helper) {
        var lstfieldPermissions = component.get("v.dashboardData");
        if(lstfieldPermissions.length > 0){
            var data = [];
            var headerArray = [];
            var csvContentArray = [];
            
            //Fill out the Header of CSV
            headerArray.push('S.No');
            headerArray.push('Id');
            headerArray.push('Developer Name');
            headerArray.push('Folder Name');
            data.push(headerArray);
            
            var sno = 0;
            for(var i=0;i<lstfieldPermissions.length;i++){
                //Initialize the temperory array
                var tempArray = [];
                //use parseInt to perform math operation
                sno = parseInt(sno) + parseInt(1);
                tempArray.push('"'+sno+'"');
                tempArray.push('"'+lstfieldPermissions[i].Id+'"');
                tempArray.push('"'+lstfieldPermissions[i].DeveloperName+'"');
                tempArray.push('"'+lstfieldPermissions[i].FolderName+'"');
                data.push(tempArray);   
            }
            
            for(var j=0;j<data.length;j++){
                var dataString = data[j].join(",");
                csvContentArray.push(dataString);
            }
            
            var csvContent = csvContentArray.join("\r\n");
            //var csvContent = CSV + csvContentArray.join("rn");
            
            //Generate a file name
            var fileName = "Dashboards_";
            //this will remove the blank-spaces from the title and replace it with an underscore
            fileName += new Date().toUTCString();
            fileName += ".csv";
            //Initialize file format you want csv or xls
            var uri = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent);
            
            if (navigator.msSaveBlob) { // IE 10+
                var blob = new Blob([csvContent],{type: "text/csv;charset=utf-8;"});
                navigator.msSaveBlob(blob, fileName);
            }
            else{
                var link = document.createElement("a");
                link.setAttribute('download',fileName);
                link.href = uri;
                link.style = "visibility:hidden";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }else{
            alert('Nothing to export!');
        }
    },
})