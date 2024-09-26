sap.ui.define(["sap/ui/core/mvc/ControllerExtension","jquery.sap.global","sap/ui/model/Filter","sap/ui/model/FilterOperator"],function(e,jQuery,t,r){"use strict";var o;return e.extend("collauth.ext.controller.UserEmail",{override:{onInit:function(){var e=this.base.getExtensionAPI().getModel();debugger;var t=(new sap.ushell.services.UserInfo).getEmail();o=t},onBeforeRendering:async function(){debugger;var e=this.base.getExtensionAPI().getModel();if(!e){console.error("Model is not available.");return}var n;if(typeof e.getServiceUrl==="function"){n=e.getServiceUrl();console.log("Service URL:",n)}else{console.error("Unable to determine the service URL.");return}const a=this.base.getView().getContent()[0].mAggregations.content.mAggregations.content.mAssociations.filter;try{const e=await new Promise((e,t)=>{jQuery.ajax({url:n+"/Department",method:"GET",dataType:"json",success:function(t){e(t)},error:function(e,r,o){t(new Error(r+": "+o))}})});console.log("Fetched data:",e);if(e&&e.value){e.value.forEach(function(e){console.log("Department Name:",e.DepartmentName)})}else{console.log("No data found or invalid response format")}}catch(e){console.error("Error fetching data",e)}try{const e=await new Promise((e,t)=>{jQuery.ajax({url:n+"/AAuthorized",method:"GET",dataType:"json",success:function(t){e(t)},error:function(e,r,o){t(new Error(r+": "+o))}})});console.log("Fetched Authorization data:",e);var i;if(e&&e.value){e.value.forEach(function(e){if(e.authEmail===o){i=e.authName}}.bind(this))}else{console.log("No data found or invalid response format")}var s=this.getView().findAggregatedObjects(true,function(e){return e.isA("sap.ui.table.Table")||e.isA("sap.m.Table")})[0];debugger;var l=s.getBinding("items");if(i!=="Owner"){this.base.getView().findAggregatedObjects(true,function(e){return e.isA("sap.m.Button")}).forEach(function(e){if(e.getId().includes("Create")||e.getId().includes("Delete")){e.setVisible(false)}});var c=sap.ui.getCore().byId(a);var u={$editState:[{operator:"DRAFT_EDIT_STATE",values:["ALL_HIDING_DRAFTS","All (Hiding Drafts)"],validated:"Validated"}]};if(l){var d=new t({path:"IsActiveEntity",operator:r.EQ,value1:true});l.filter([d])}c.setFilterConditions(u);this.base.getView().findAggregatedObjects(true,function(e){return e.isA("sap.fe.macros.controls.FilterBar")}).forEach(function(e){e.setVisible(false)})}}catch(e){console.error("Error fetching Roll data",e)}}}})});
//# sourceMappingURL=MainListcontroller.controller.js.map