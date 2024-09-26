//@ui5-bundle nwcollege/Component-preload.js
sap.ui.require.preload({
	"nwcollege/Component.js":function(){
sap.ui.define(["sap/fe/core/AppComponent"],function(e){"use strict";return e.extend("nwcollege.Component",{metadata:{manifest:"json"}})});
},
	"nwcollege/ext/controller/Departmentobjectcontrol.controller.js":function(){
sap.ui.define(["sap/ui/core/mvc/ControllerExtension","jquery.sap.global"],function(e,jQuery){"use strict";var o;return e.extend("nwcollege.ext.controller.Departmentobjectcontrol",{override:{onInit:function(){var e=this.base.getExtensionAPI().getModel();debugger;var n=(new sap.ushell.services.UserInfo).getEmail();o=n},routing:{onBeforeBinding:async function(e){debugger;console.log("onBeforeBinding called with context:",e);if(e){console.log("Binding Context Path:",e.getPath())}else{console.log("No binding context available.");return}var n=this.base.getExtensionAPI().getModel();if(!n){console.error("Model is not available.");return}var t;if(typeof n.getServiceUrl==="function"){t=n.getServiceUrl();console.log("Service URL:",t)}else{console.error("Unable to determine the service URL.");return}try{const e=await new Promise((e,o)=>{jQuery.ajax({url:t+"/Department",method:"GET",dataType:"json",success:function(o){e(o)},error:function(e,n,t){o(new Error(n+": "+t))}})});console.log("Fetched data:",e);if(e&&e.value){e.value.forEach(function(e){console.log("Department Name:",e.DepartmentName)})}else{console.log("No data found or invalid response format")}}catch(e){console.error("Error fetching data",e)}try{const e=await new Promise((e,o)=>{jQuery.ajax({url:t+"/AAuthorized",method:"GET",dataType:"json",success:function(o){e(o)},error:function(e,n,t){o(new Error(n+": "+t))}})});console.log("Fetched Authorization data:",e);var r;if(e&&e.value){debugger;e.value.forEach(function(e){if(e.authEmail===o){r=e.authName}})}else{console.log("No data found or invalid response format")}var a=window.location.href;var l=a.indexOf("#");var s=a.substring(l+1);var i;if(s.includes("DepartmentID")){console.log("hellllo");var c=s.match(/DepartmentID='([^']+)'/);if(c&&c[1]){i=c[1]}}console.log("current url",a);console.log("sds");console.log("original hash",l);console.log("sadad",s);console.log("Department id",i);console.log("ndnd");this.base.getView().findAggregatedObjects(true,function(e){return e.isA("sap.m.Button")||e.isA("sap.m.Input")}).forEach(function(e){if(e.isA("sap.m.Button")){if(e.getId().includes("Create")||e.getId().includes("Delete")||e.getId().includes("Edit")){if(r==="MCA"&&i==="D2"||r==="Owner"){e.setEnabled(true)}else if(r==="cse"&&i==="D1"||r==="Owner"){e.setEnabled(true)}else{e.setEnabled(false)}}}else if(e.isA("sap.m.Input")&&e.getId().includes("DepartmentName")){e.setEnabled(r==="Owner")}})}catch(e){console.error("Error fetching Roll data",e)}}}}})});
},
	"nwcollege/ext/controller/Footer.js":function(){
sap.ui.define(["sap/m/MessageToast"],function(e){"use strict";return{footer_meth:function(s){e.show("Custom handler invoked.")}}});
},
	"nwcollege/ext/controller/MainListcontroller.controller.js":function(){
sap.ui.define(["sap/ui/core/mvc/ControllerExtension","jquery.sap.global","sap/ui/model/Filter","sap/ui/model/FilterOperator"],function(e,jQuery,t,r){"use strict";var o;return e.extend("collauth.ext.controller.UserEmail",{override:{onInit:function(){var e=this.base.getExtensionAPI().getModel();debugger;var t=(new sap.ushell.services.UserInfo).getEmail();o=t},onBeforeRendering:async function(){debugger;var e=this.base.getExtensionAPI().getModel();if(!e){console.error("Model is not available.");return}var n;if(typeof e.getServiceUrl==="function"){n=e.getServiceUrl();console.log("Service URL:",n)}else{console.error("Unable to determine the service URL.");return}const a=this.base.getView().getContent()[0].mAggregations.content.mAggregations.content.mAssociations.filter;try{const e=await new Promise((e,t)=>{jQuery.ajax({url:n+"/Department",method:"GET",dataType:"json",success:function(t){e(t)},error:function(e,r,o){t(new Error(r+": "+o))}})});console.log("Fetched data:",e);if(e&&e.value){e.value.forEach(function(e){console.log("Department Name:",e.DepartmentName)})}else{console.log("No data found or invalid response format")}}catch(e){console.error("Error fetching data",e)}try{const e=await new Promise((e,t)=>{jQuery.ajax({url:n+"/AAuthorized",method:"GET",dataType:"json",success:function(t){e(t)},error:function(e,r,o){t(new Error(r+": "+o))}})});console.log("Fetched Authorization data:",e);var i;if(e&&e.value){e.value.forEach(function(e){if(e.authEmail===o){i=e.authName}}.bind(this))}else{console.log("No data found or invalid response format")}var s=this.getView().findAggregatedObjects(true,function(e){return e.isA("sap.ui.table.Table")||e.isA("sap.m.Table")})[0];debugger;var l=s.getBinding("items");if(i!=="Owner"){this.base.getView().findAggregatedObjects(true,function(e){return e.isA("sap.m.Button")}).forEach(function(e){if(e.getId().includes("Create")||e.getId().includes("Delete")){e.setVisible(false)}});var c=sap.ui.getCore().byId(a);var u={$editState:[{operator:"DRAFT_EDIT_STATE",values:["ALL_HIDING_DRAFTS","All (Hiding Drafts)"],validated:"Validated"}]};if(l){var d=new t({path:"IsActiveEntity",operator:r.EQ,value1:true});l.filter([d])}c.setFilterConditions(u);this.base.getView().findAggregatedObjects(true,function(e){return e.isA("sap.fe.macros.controls.FilterBar")}).forEach(function(e){e.setVisible(false)})}}catch(e){console.error("Error fetching Roll data",e)}}}})});
},
	"nwcollege/i18n/i18n.properties":'# This is the resource bundle for nwcollege\n\n#Texts for manifest.json\n\n#XTIT: Application name\nappTitle=nwcollegeapps\n\n#YDES: Application description\nappDescription=An SAP Fiori application.\n\n#XFLD,39\nflpTitle=necollegeappl\n\n#XFLD,42\nflpTitle=nwcollegeappli\n\n#XFLD,24\nflpSubtitle=subtitle\n\n#XFLD,45\nflpTitle=nwcollegeappli1\n\n#XFLD,24\nflpSubtitle=subtitle\n\n#XFLD,27\nflpTitle=necollge1\n\n#XFLD,24\nflpSubtitle=subtitle\n\n#XFLD,42\nflpTitle=newcollegeapp1\n\n#XFLD,24\nflpSubtitle=subtitle\n',
	"nwcollege/manifest.json":'{"_version":"1.59.0","sap.app":{"id":"nwcollege","type":"application","i18n":"i18n/i18n.properties","applicationVersion":{"version":"0.0.1"},"title":"College Of Engineering","description":"{{appDescription}}","resources":"resources.json","sourceTemplate":{"id":"@sap/generator-fiori:lrop","version":"1.14.2","toolsId":"1dfcf110-f25f-4df3-9d62-5dc6a6cad1c1"},"dataSources":{"mainService":{"uri":"odata/v4/my/","type":"OData","settings":{"annotations":[],"odataVersion":"4.0"}}},"crossNavigation":{"inbounds":{"nwcollegea-display":{"semanticObject":"nwcollegea","action":"display","title":"{{flpTitle}}","signature":{"parameters":{},"additionalParameters":"allowed"}},"nwcollegeapp-display":{"semanticObject":"nwcollegeapp","action":"display","title":"{{flpTitle}}","subTitle":"{{flpSubtitle}}","signature":{"parameters":{},"additionalParameters":"allowed"}},"nwcollegeapp1-display":{"semanticObject":"nwcollegeapp1","action":"display","title":"{{flpTitle}}","subTitle":"{{flpSubtitle}}","signature":{"parameters":{},"additionalParameters":"allowed"}},"nwcollgapp1-display":{"semanticObject":"nwcollgapp1","action":"display","title":"{{flpTitle}}","subTitle":"{{flpSubtitle}}","signature":{"parameters":{},"additionalParameters":"allowed"}},"newcollege1-display":{"semanticObject":"newcollege1","action":"display","title":"{{flpTitle}}","subTitle":"{{flpSubtitle}}","signature":{"parameters":{},"additionalParameters":"allowed"}}}}},"sap.ui":{"technology":"UI5","icons":{"icon":"","favIcon":"","phone":"","phone@2":"","tablet":"","tablet@2":""},"deviceTypes":{"desktop":true,"tablet":true,"phone":true}},"sap.ui5":{"flexEnabled":true,"dependencies":{"minUI5Version":"1.126.2","libs":{"sap.m":{},"sap.ui.core":{},"sap.ushell":{},"sap.fe.templates":{}}},"contentDensities":{"compact":true,"cozy":true},"models":{"i18n":{"type":"sap.ui.model.resource.ResourceModel","settings":{"bundleName":"nwcollege.i18n.i18n"}},"":{"dataSource":"mainService","preload":true,"settings":{"operationMode":"Server","autoExpandSelect":true,"earlyRequests":true}},"@i18n":{"type":"sap.ui.model.resource.ResourceModel","uri":"i18n/i18n.properties"}},"resources":{"css":[]},"routing":{"config":{},"routes":[{"pattern":":?query:","name":"DepartmentList","target":"DepartmentList"},{"pattern":"Department({key}):?query:","name":"DepartmentObjectPage","target":"DepartmentObjectPage"},{"pattern":"Department({key})/deptToStudent({key2}):?query:","name":"Department_deptToStudentObjectPage","target":"Department_deptToStudentObjectPage"},{"pattern":"Department({key})/deptToTeacher({key2}):?query:","name":"Department_deptToTeacherObjectPage","target":"Department_deptToTeacherObjectPage"}],"targets":{"DepartmentList":{"type":"Component","id":"DepartmentList","name":"sap.fe.templates.ListReport","options":{"settings":{"contextPath":"/Department","variantManagement":"None","navigation":{"Department":{"detail":{"route":"DepartmentObjectPage"}}},"controlConfiguration":{"@com.sap.vocabularies.UI.v1.LineItem":{"tableSettings":{"type":"ResponsiveTable"}}},"initialLoad":"Enabled"}}},"DepartmentObjectPage":{"type":"Component","id":"DepartmentObjectPage","name":"sap.fe.templates.ObjectPage","options":{"settings":{"editableHeaderContent":false,"contextPath":"/Department","navigation":{"deptToStudent":{"detail":{"route":"Department_deptToStudentObjectPage"}},"deptToTeacher":{"detail":{"route":"Department_deptToTeacherObjectPage"}}},"variantManagement":"None","content":{"footer":{"actions":{"obj1":{"press":"nwcollege.ext.controller.Footer.footer_meth","visible":true,"enabled":true,"text":"COE | @COPYRIGHT | 2024 | CONTACT US"}}}}}}},"Department_deptToStudentObjectPage":{"type":"Component","id":"Department_deptToStudentObjectPage","name":"sap.fe.templates.ObjectPage","options":{"settings":{"contextPath":"/Department/deptToStudent","navigation":{},"variantManagement":"None","content":{"footer":{"actions":{"obj2":{"press":"nwcollege.ext.controller.Footer.footer_meth","visible":true,"enabled":true,"text":"COE | @COPYRIGHT | 2024 | CONTACT US"}}}}}}},"Department_deptToTeacherObjectPage":{"type":"Component","id":"Department_deptToTeacherObjectPage","name":"sap.fe.templates.ObjectPage","options":{"settings":{"contextPath":"/Department/deptToTeacher","navigation":{},"variantManagement":"None","content":{"footer":{"actions":{"obj3":{"press":"nwcollege.ext.controller.Footer.footer_meth","visible":true,"enabled":true,"text":"COE | @COPYRIGHT | 2024 | CONTACT US"}}}}}}}}},"extends":{"extensions":{"sap.ui.controllerExtensions":{"sap.fe.templates.ListReport.ListReportController":{"controllerName":"nwcollege.ext.controller.MainListcontroller"},"sap.fe.templates.ObjectPage.ObjectPageController#nwcollege::DepartmentObjectPage":{"controllerName":"nwcollege.ext.controller.Departmentobjectcontrol"}}}}},"sap.fiori":{"registrationIds":[],"archeType":"transactional"},"sap.cloud":{"public":true,"service":"collegeteachapp"}}'
});
//# sourceMappingURL=Component-preload.js.map
