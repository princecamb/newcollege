sap.ui.define(["sap/ui/core/mvc/ControllerExtension","jquery.sap.global"],function(e,jQuery){"use strict";var o;return e.extend("nwcollege.ext.controller.Departmentobjectcontrol",{override:{onInit:function(){var e=this.base.getExtensionAPI().getModel();debugger;var n=(new sap.ushell.services.UserInfo).getEmail();o=n},routing:{onBeforeBinding:async function(e){debugger;console.log("onBeforeBinding called with context:",e);if(e){console.log("Binding Context Path:",e.getPath())}else{console.log("No binding context available.");return}var n=this.base.getExtensionAPI().getModel();if(!n){console.error("Model is not available.");return}var t;if(typeof n.getServiceUrl==="function"){t=n.getServiceUrl();console.log("Service URL:",t)}else{console.error("Unable to determine the service URL.");return}try{const e=await new Promise((e,o)=>{jQuery.ajax({url:t+"/Department",method:"GET",dataType:"json",success:function(o){e(o)},error:function(e,n,t){o(new Error(n+": "+t))}})});console.log("Fetched data:",e);if(e&&e.value){e.value.forEach(function(e){console.log("Department Name:",e.DepartmentName)})}else{console.log("No data found or invalid response format")}}catch(e){console.error("Error fetching data",e)}try{const e=await new Promise((e,o)=>{jQuery.ajax({url:t+"/AAuthorized",method:"GET",dataType:"json",success:function(o){e(o)},error:function(e,n,t){o(new Error(n+": "+t))}})});console.log("Fetched Authorization data:",e);var r;if(e&&e.value){debugger;e.value.forEach(function(e){if(e.authEmail===o){r=e.authName}})}else{console.log("No data found or invalid response format")}var a=window.location.href;var l=a.indexOf("#");var s=a.substring(l+1);var i;if(s.includes("DepartmentID")){console.log("hellllo");var c=s.match(/DepartmentID='([^']+)'/);if(c&&c[1]){i=c[1]}}console.log("current url",a);console.log("sds");console.log("original hash",l);console.log("sadad",s);console.log("Department id",i);console.log("ndnd");this.base.getView().findAggregatedObjects(true,function(e){return e.isA("sap.m.Button")||e.isA("sap.m.Input")}).forEach(function(e){if(e.isA("sap.m.Button")){if(e.getId().includes("Create")||e.getId().includes("Delete")||e.getId().includes("Edit")){if(r==="MCA"&&i==="D2"||r==="Owner"){e.setEnabled(true)}else if(r==="cse"&&i==="D1"||r==="Owner"){e.setEnabled(true)}else{e.setEnabled(false)}}}else if(e.isA("sap.m.Input")&&e.getId().includes("DepartmentName")){e.setEnabled(r==="Owner")}})}catch(e){console.error("Error fetching Roll data",e)}}}}})});
//# sourceMappingURL=Departmentobjectcontrol.controller.js.map