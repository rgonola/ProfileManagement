({
    fetchPickListVal: function(component, fieldName, elementId) {
        var action = component.get("c.getselectOptions");
        action.setParams({
            "objObject": "Profile",
            "fld": fieldName
        });
        var opts = [];
        action.setCallback(this, function(response) {
            if (response.getState() == "SUCCESS") {
                var allValues = response.getReturnValue();
                opts.push({
                    class: "optionClass",
                    label: "--None--",
                    value: "--None--"
                });
                for (var i = 0; i < allValues.length; i++) {
                    opts.push({
                        class: "optionClass",
                        label: allValues[i],
                        value: allValues[i]
                    });
                }
                component.find(elementId).set("v.options", opts);
            }
        });
        $A.enqueueAction(action);
    },
    
    fetchObjectPermissions: function(component, profileName) {
        var action = component.get("c.getObjectPermissions");
        action.setParams({
            "profileName": profileName
        });
        action.setCallback(this, function(response) {
            if (response.getState() == "SUCCESS") {
                component.set('v.objectPermissions',response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    },
    
    fetchFieldPermissions: function(component, profileName, selTable) {
        var action = component.get("c.getFieldPermissions");
        action.setParams({
            "profileName": profileName,
            "objectName": selTable
            
        });
        action.setCallback(this, function(response) {
            if (response.getState() == "SUCCESS") {
                component.set('v.fieldPermissions',response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    },
    
    fetchProfiles: function(component, elementId, tableName) {
        var action = component.get("c.getProfileNames");
        var opts = [];
        action.setParams({
            "tableName": tableName
           });  
        action.setCallback(this, function(response) {
            if (response.getState() == "SUCCESS") {
                var allValues = response.getReturnValue();
                var opts = [];
                for (var i = 0; i < allValues.length; i++) {
                    opts.push({
                        class: "optionClass",
                        label: allValues[i],
                        value: allValues[i]
                    });
                }
                
                component.set("v.profileOptionList", opts);
            }
        });
        $A.enqueueAction(action);
    },
    
    fetchTables: function(component, elementId, layoutName) {
        var action = component.get("c.getTableEnumOrId");
        var opts = [];
        action.setParams({
            "layoutName": layoutName
         });   
        action.setCallback(this, function(response) {
            if (response.getState() == "SUCCESS") {
                var allValues = response.getReturnValue();
                var optionsList = [];
                for (var key in allValues) {
                    if (allValues.hasOwnProperty(key)) {
                        optionsList.push({value: key, label: allValues[key]});
                    }
                };
                console.log(optionsList);
                component.set("v.optionsList", optionsList);
            }
        });
        $A.enqueueAction(action);
    },
    
    fetchProfileLayoutData: function(component, selLay, selTable) {
        var action = component.get("c.getProfileLayout");
        action.setParams({
            "recordTypeName": selLay,
            "objectName": selTable
        });
        var opts = [];
        action.setCallback(this, function(response) {
            if (response.getState() == "SUCCESS") {
                if(response.getReturnValue().length > 0){
                    component.set('v.profileLayouts',response.getReturnValue());
                }else{
                    alert('No record found!');
                }
            }
        });
        $A.enqueueAction(action);
    },
    
    fetchProcessBuilderData : function(component) {
        var action = component.get("c.getProcessBuilders");
        action.setCallback(this, function(response) {
            if (response.getState() == "SUCCESS") {
                if(response.getReturnValue().length > 0){
                    component.set('v.processBuilders',response.getReturnValue());
                }else{
                    alert('No record found!');
                }
            }
        });
        $A.enqueueAction(action);
    },
    fetchWorkflowRuleData: function(component, selTable) {
        var action = component.get("c.getWorkflowRules");
        action.setParams({
            "objectName": selTable
        });
        var opts = [];
        action.setCallback(this, function(response) {
            if (response.getState() == "SUCCESS") {
                if(response.getReturnValue().length > 0){
                    component.set('v.worflows',response.getReturnValue());
                }else{
                    alert('No record found!');
                }
            }
        });
        $A.enqueueAction(action);
    },
    
    fetchValidationRuleData: function(component, selTable) {
        var action = component.get("c.getValidationRules");
        action.setParams({
            "objectName": selTable
        });
        var opts = [];
        action.setCallback(this, function(response) {
            if (response.getState() == "SUCCESS") {
                if(response.getReturnValue().length > 0){
                    component.set('v.validationRules',response.getReturnValue());
                }else{
                    alert('No record found!');
                }
            }
        });
        $A.enqueueAction(action);
    },
    
    fetchObjectButtons: function(component, selTable) {
        var action = component.get("c.getCustomButtons");
        action.setParams({
            "objectName": selTable
        });
        action.setCallback(this, function(response) {
            if (response.getState() == "SUCCESS") {
                component.set('v.customButtons',response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    },
    
    fetchObjectVFs: function(component, selTable) {
        var action = component.get("c.getVisualforcePages");
        action.setParams({
            "objectName": selTable
        });
        action.setCallback(this, function(response) {
            if (response.getState() == "SUCCESS") {
                component.set('v.apexPages',response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    },
    
    fetchGroupNames: function(component, elementId, folderName) {
        var action = component.get("c.getGroupNames");
        var opts = [];
        action.setCallback(this, function(response) {
            if (response.getState() == "SUCCESS") {
                var allValues = response.getReturnValue();
                var opts = [];
                for (var i = 0; i < allValues.length; i++) {
                    opts.push({
                        class: "optionClass",
                        label: allValues[i],
                        value: allValues[i]
                    });
                }
                
                component.set("v.groupNameList", opts);
            }
        });
        $A.enqueueAction(action);
    },
    
    fetchFolders: function(component, elementId, folderName) {
        var action = component.get("c.getFolderNames");
        var opts = [];
        action.setCallback(this, function(response) {
            if (response.getState() == "SUCCESS") {
                var allValues = response.getReturnValue();
                var opts = [];
                for (var i = 0; i < allValues.length; i++) {
                    opts.push({
                        class: "optionClass",
                        label: allValues[i],
                        value: allValues[i]
                    });
                }
                
                component.set("v.folderList", opts);
            }
        });
        $A.enqueueAction(action);
    },
    
    fetchReports: function(component, folderName) {
        var action = component.get("c.getReportData");
        action.setParams({
            "folderName": folderName
        });
        action.setCallback(this, function(response) {
            if (response.getState() == "SUCCESS") {
                component.set('v.reportData',response.getReturnValue());
                console.log(JSON.stringify(response.getReturnValue()));
            }
        });
        $A.enqueueAction(action);
    },
    fetchGroupUsers: function(component, groupName) {
        var action = component.get("c.getGroupData");
        action.setParams({
            "groupName": groupName
        });
        action.setCallback(this, function(response) {
            if (response.getState() == "SUCCESS") {
                component.set('v.groupUserData',response.getReturnValue());
                console.log(JSON.stringify(response.getReturnValue()));
            }
        });
        $A.enqueueAction(action);
    },
    
    fetchDashboards: function(component,folderName) {
        var action = component.get("c.getDashboardData");
        action.setParams({
            "folderName": folderName
        });
        action.setCallback(this, function(response) {
            if (response.getState() == "SUCCESS") {
                component.set('v.dashboardData',response.getReturnValue());
                console.log(JSON.stringify(response.getReturnValue()));
            }
        });
        $A.enqueueAction(action);
    },
    
    fetchDashboardFolders: function(component, elementId, folderName) {
        var action = component.get("c.getDashboardFolderNames");
        var opts = [];
        action.setCallback(this, function(response) {
            if (response.getState() == "SUCCESS") {
                var allValues = response.getReturnValue();
                var opts = [];
                for (var i = 0; i < allValues.length; i++) {
                    opts.push({
                        class: "optionClass",
                        label: allValues[i],
                        value: allValues[i]
                    });
                }
                
                component.set("v.dashboardFolderList", opts);
            }
        });
        $A.enqueueAction(action);
    },
 })