sap.ui.define(["sap/m/MessageToast"],function(e){"use strict";var t;return{onAfterItemAdded:function(e){var t=e.getSource().getParent();var r=t.getBindingContext().getProperty("ttuuid");debugger;var o=e.getParameter("item");var a=e.oSource.getModel().getServiceUrl();var i=/Teacher.*$/;var s=window.location.href.match(i);if(s){var l=s[0]}var n={mediaType:o.getMediaType(),fileName:o.getFileName(),size:o.getFileObject().size,ttuuid:r};var c=window.location.href.split("#")[1];var u={url:a+l+"/teacherToFiles",method:"POST",headers:{"Content-type":"application/json"},data:JSON.stringify(n)};new Promise((e,t)=>{$.ajax(u).done((t,r,o)=>{e(t.ID)}).fail(e=>{t(e)})}).then(e=>{var t=a+`Files(ID=${e},IsActiveEntity=false)/content`;var r=this.byId("uploadSet");o.setUrl(t);r.setUploadUrl(t);r.setHttpRequestMethod("PUT");r.uploadItem(o)}).catch(e=>{console.log(e)})},onUploadCompleted:function(t){var r=this.byId("uploadSet");r.removeAllIncompleteItems();e.show("Uploaded successfully!")},onOpenPressed:async function(e){debugger;var t=e.oSource.getModel().getServiceUrl();var r;if(e.oSource.mProperties.url.substring(0,6)==="/Files"){r=t+e.oSource.mProperties.url.substring(1)}if(r){e.oSource.mProperties.url=r}},onAfterItemRemoved:async function(e){debugger;var t=e.oSource.getModel().getServiceUrl();const r=/^(.*?),IsActiveEntity=/;let o=e.mParameters.item.mProperties.url.match(r);let a=o[1]+",IsActiveEntity=false)";a=a.replace(/^.*\/Files/,"/Files");$.ajax({url:t+a,method:"DELETE"})},onAfterItemEdited:async function(e){debugger;var t=e.oSource.getModel().getServiceUrl();const r=/^(.*?),IsActiveEntity=/;let o=e.mParameters.item.mProperties.url.match(r);let a=o[1]+",IsActiveEntity=false) ";a=a.replace(/^.*\/Files/,"/Files");let i={fileName:e.getParameter("item").getFileName()};$.ajax({url:t+a,method:"PATCH",contentType:"application/json",data:JSON.stringify(i),success:function(e){console.log("Update successful:",e)},error:function(e){console.error("Update failed:",e)}})}}});
//# sourceMappingURL=Resume.js.map