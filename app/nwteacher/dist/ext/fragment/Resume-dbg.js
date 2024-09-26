// sap.ui.define([
//     "sap/m/MessageToast"
// ], function (MessageToast) {
//     'use strict';


//     return {
//         onPress: function (oEvent) {
//             debugger
//             MessageToast.show("upload triggering");
//         },


//         onAfterItemAdded: function (oEvent) {
//             debugger
//             console.log("onAfterItemAdded triggered");
//             var item = oEvent.getParameter("item");


//             // Create Entity and Upload Content logic
//             var data = {
//                 mediaType: item.getMediaType(),
//                 fileName: item.getFileName(),
//                 size: item.getFileObject().size
//             };


//             var settings = {
//                 url: "/odata/v4/my/Files",
//                 method: "POST",
//                 headers: {
//                     "Content-type": "application/json"
//                 },
//                 data: JSON.stringify(data)
//             };


//             new Promise((resolve, reject) => {
//                 $.ajax(settings)
//                     .done((results, textStatus, request) => {
//                         resolve(results.ID);
//                     })
//                     .fail((err) => {
//                         reject(err);
//                     });
//             })
//             .then((id) => {
//                 debugger
//                 var url = `/odata/v4/my/Files(${id})/content`;
//                 console.log(url);
//                 item.setUploadUrl(url);
//                 var oUploadSet = this.byId("uploadSet"); // Adjust to get the correct reference
//                 oUploadSet.setHttpRequestMethod("PUT");
//                 oUploadSet.uploadItem(item);


//             })
//             .catch((err) => {
//                 console.log(err);
//             });
//         },


//         onUploadCompleted: function (oEvent) {
//             debugger
//             var oUploadSet = this.byId("uploadSet"); // Adjust to get the correct reference
//             oUploadSet.removeAllIncompleteItems();
//             oUploadSet.getBinding("items").refresh();
//             // this.oItemToUpdate = null;
//             // this.byId("versionButton").setEnabled(false);
//         },
    

//         // onUploadCompleted: function (oEvent) {
//         //     const oUploadSet = Core.byId(uploadSetWidgetName);
//         //     oUploadSet.removeAllIncompleteItems();
//         //     // oUploadSet.getBinding("items").refresh(); //Fails
        
//         //     this.base.editFlow.invokeAction("MyService.refreshFiles", {
//         //         contexts: this.getView().getBindingContext(),
//         //     })
//         // },

//         onBeforeItemRemoved: function (oEvent) {
//             debugger
//             var item = oEvent.getParameter("item");
//             var fileId = item.getBindingContext().getProperty("ID"); // Assuming 'ID' is the key


//             var settings = {
//                 url: `/odata/v4/my/Files(${fileId})`,
//                 method: "DELETE",
//                 headers: {
//                     "Content-type": "application/json"
//                 }
//             };


//             return new Promise((resolve, reject) => {
//                 $.ajax(settings)
//                     .done(() => {
//                         resolve();
//                     })
//                     .fail((err) => {
//                         reject(err);
//                     });
//             }).catch((err) => {
//                 console.log("Failed to delete the item from the database", err);
//                 // Optionally prevent the UI removal if the delete failed
//                 oEvent.preventDefault();
//             });
//         },

//         onOpenPressed: function (oEvent) {
//             {
// 				oEvent.preventDefault();
// 				var item = oEvent.getSource();
// 				this._fileName = item.getFileName();
// 				this._download(item)
// 					.then((blob) => {
// 						var url = window.URL.createObjectURL(blob);
// 						// //open in the browser
// 						// window.open(url);

// 						//download
// 						var link = document.createElement('a');
// 						link.href = url;
// 						link.setAttribute('download', this._fileName);
// 						document.body.appendChild(link);
// 						link.click();
// 						document.body.removeChild(link);						
// 					})
// 					.catch((err)=> {
// 						console.log(err);
// 					});					
//                 }
//             // to be implemented
//         },


//         onUploadSelectedButton: function () {
//             debugger
//             MessageToast.show("onUploadSelectedButton");
//             var oUploadSet = sap.ui.getCore().byId("uploadSet"); // Adjust to get the correct reference
//             oUploadSet.getItems().forEach(function (oItem) {
//                 if (oItem.getListItem().getSelected()) {
//                     oUploadSet.uploadItem(oItem);
//                 }
//             });
//         },


//         onDownloadSelectedButton: function () {
//             debugger
//             MessageToast.show("onDownloadSelectedButton");
           
//             // Use the view's byId method to get the UploadSet control
//             var oUploadSet = this.byId("uploadSet");
           
//             if (!oUploadSet) {
//                 MessageToast.show("UploadSet control not found.");
//                 return;
//             }
           
//             // Iterate over items and download selected ones
//             oUploadSet.getItems().forEach(function (oItem) {
//                 if (oItem.getListItem().getSelected()) {
//                     oItem.download(true);
//                 }
//             });
//         },


//         onSelectionChange: function () {
//             MessageToast.show("onSelectionChange");
//             var oUploadSet = sap.ui.getCore().byId("uploadSet"); // Adjust to get the correct reference
//             // If there's any item selected, sets version button enabled
//             if (oUploadSet.getSelectedItems().length > 0) {
//                 if (oUploadSet.getSelectedItems().length === 1) {
//                     sap.ui.getCore().byId("versionButton").setEnabled(true);
//                 } else {
//                     sap.ui.getCore().byId("versionButton").setEnabled(false);
//                 }
//             } else {
//                 sap.ui.getCore().byId("versionButton").setEnabled(false);
//             }
//         },


//         onVersionUpload: function (oEvent) {
//             MessageToast.show("onVersionUpload");
//             var oUploadSet = sap.ui.getCore().byId("UploadSet"); // Adjust to get the correct reference
//             this.oItemToUpdate = oUploadSet.getSelectedItems()[0];
//             oUploadSet.openFileDialog(this.oItemToUpdate);
//         }
//     };
// });









// sap.ui.define([
//     "sap/m/MessageToast"
// ], function(MessageToast) {
//     'use strict';

//     return {
//         onPress: function(oEvent) {
//             MessageToast.show("Custom handler invoked.");
//         }
//     };
// });


// sap.ui.define([
//     "sap/m/MessageToast"
// ], function (MessageToast) {
//     'use strict';


//     return {
//         onPress: function (oEvent) {
//             debugger
//             MessageToast.show("upload triggering");
//         },


//         onAfterItemAdded: function (oEvent) {
//             debugger
//             console.log("onAfterItemAdded triggered");
//             var item = oEvent.getParameter("item");


//             // Create Entity and Upload Content logic
//             var data = {
//                 mediaType: item.getMediaType(),
//                 fileName: item.getFileName(),
//                 size: item.getFileObject().size
//             };


//             var settings = {
//                 url: "/odata/v4/my/Files",
//                 method: "POST",
//                 headers: {
//                     "Content-type": "application/json"
//                 },
//                 data: JSON.stringify(data)
//             };


//             new Promise((resolve, reject) => {
//                 $.ajax(settings)
//                     .done((results, textStatus, request) => {
//                         resolve(results.ID);
//                     })
//                     .fail((err) => {
//                         reject(err);
//                     });
//             })
//             .then((id) => {
//                 debugger
//                 var url = `/odata/v4/my/Files(${id})/content`;
//                 console.log(url);
//                 item.setUploadUrl(url);
//                 var oUploadSet = this.byId("uploadSet"); // Adjust to get the correct reference
//                 oUploadSet.setHttpRequestMethod("PUT");
//                 oUploadSet.uploadItem(item);


//             })
//             .catch((err) => {
//                 console.log(err);
//             });
//         },


//         onUploadCompleted: function (oEvent) {
//             debugger
//             var oUploadSet = this.byId("uploadSet"); // Adjust to get the correct reference
//             oUploadSet.removeAllIncompleteItems();
//             oUploadSet.getBinding("items").refresh();
//             // this.oItemToUpdate = null;
//             // this.byId("versionButton").setEnabled(false);
//         },
//         onBeforeItemRemoved: function (oEvent) {
//             debugger
//             var item = oEvent.getParameter("item");
//             var fileId = item.getBindingContext().getProperty("ID"); // Assuming 'ID' is the key


//             var settings = {
//                 url: `/odata/v4/my/Files(${fileId})`,
//                 method: "DELETE",
//                 headers: {
//                     "Content-type": "application/json"
//                 }
//             };


//             return new Promise((resolve, reject) => {
//                 $.ajax(settings)
//                     .done(() => {
//                         resolve();
//                     })
//                     .fail((err) => {
//                         reject(err);
//                     });
//             }).catch((err) => {
//                 console.log("Failed to delete the item from the database", err);
//                 // Optionally prevent the UI removal if the delete failed
//                 oEvent.preventDefault();
//             });
//         },
//         onOpenPressed: function (oEvent) {
//             // to be implemented
//         },


//         onUploadSelectedButton: function () {
//             debugger
//             MessageToast.show("onUploadSelectedButton");
//             var oUploadSet = sap.ui.getCore().byId("uploadSet"); // Adjust to get the correct reference
//             oUploadSet.getItems().forEach(function (oItem) {
//                 if (oItem.getListItem().getSelected()) {
//                     oUploadSet.uploadItem(oItem);
//                 }
//             });
//         },


//         onDownloadSelectedButton: function () {
//             debugger
//             MessageToast.show("onDownloadSelectedButton");
           
//             // Use the view's byId method to get the UploadSet control
//             var oUploadSet = this.byId("uploadSet");
           
//             if (!oUploadSet) {
//                 MessageToast.show("UploadSet control not found.");
//                 return;
//             }
           
//             // Iterate over items and download selected ones
//             oUploadSet.getItems().forEach(function (oItem) {
//                 if (oItem.getListItem().getSelected()) {
//                     oItem.download(true);
//                 }
//             });
//         },


//         onSelectionChange: function () {
//             MessageToast.show("onSelectionChange");
//             var oUploadSet = sap.ui.getCore().byId("uploadSet"); // Adjust to get the correct reference
//             // If there's any item selected, sets version button enabled
//             if (oUploadSet.getSelectedItems().length > 0) {
//                 if (oUploadSet.getSelectedItems().length === 1) {
//                     sap.ui.getCore().byId("versionButton").setEnabled(true);
//                 } else {
//                     sap.ui.getCore().byId("versionButton").setEnabled(false);
//                 }
//             } else {
//                 sap.ui.getCore().byId("versionButton").setEnabled(false);
//             }
//         },


//         onVersionUpload: function (oEvent) {
//             MessageToast.show("onVersionUpload");
//             var oUploadSet = sap.ui.getCore().byId("UploadSet"); // Adjust to get the correct reference
//             this.oItemToUpdate = oUploadSet.getSelectedItems()[0];
//             oUploadSet.openFileDialog(this.oItemToUpdate);
//         }
//     };
// });










// sap.ui.define([
//     "sap/m/MessageToast"
// ], function (MessageToast) {
//     'use strict';

//     return {
//         onPress: function (oEvent) {
//             debugger
//             MessageToast.show("upload triggering");
//         },
//         onInit: function () {
//             var oUploadSet = this.byId("uploadSet");
//             if (oUploadSet) {
//                 oUploadSet.attachAfterItemAdded(this.onAfterItemAdded.bind(this));
//             }
           
//         },

//         onAfterItemAdded: function (oEvent) {
//             debugger
//             console.log("onAfterItemAdded triggered");
//             var baseUrl = oEvent.oSource.getModel().getServiceUrl();
//             var pattern = /Teacher.*$/;
// 			var match = window.location.href.match(pattern);
// 			if (match) {
//     			var entityUrl = match[0];
// 			}
//             var item = oEvent.getParameter("item");
//             var oView = oEvent.getSource().getParent();
//             var sttuuid = oView.getBindingContext().getProperty("ttuuid"); 
//             var hashPart = window.location.href.split('#')[1];
        
//             // Prepare data for the entity creation
//             var data = {
//                 mediaType: item.getMediaType(),
//                 fileName: item.getFileName(),
//                 size: item.getFileObject().size,
//                 ttuuid: sttuuid
//             };
        
//             var settings = {
//                 url: baseUrl + entityUrl + '/teacherToFiles',
//                 method: "POST",
//                 headers: {
//                     "Content-type": "application/json"
//                 },
//                 data: JSON.stringify(data)
//             };
        
//             // Create the entity and then set the upload URL
//             new Promise((resolve, reject) => {
//                 $.ajax(settings)
//                     .done((results, textStatus, request) => {
//                         resolve(results.ID);
//                     })
//                     .fail((err) => {
//                         reject(err);
//                     });
//             })
//             .then((id) => {
//                 debugger
//                 // Construct the upload URL using the newly created entity's ID
//                 var url = baseUrl+`Files(ID=${id},IsActiveEntity=false)/content`;
//                 console.log(url);
                
//                 // Set the upload URL and trigger the upload
//                 item.setUploadUrl(url);
//                 item.setUrl(url);
//                 var oUploadSet = this.byId("uploadSet"); // Adjust this to get the correct reference
//                 oUploadSet.setHttpRequestMethod("PUT");
//                 oUploadSet.uploadItem(item);
        
//             })
//             .catch((err) => {
//                 console.log(err);
//             });
//         },        
//         // onAfterItemRemoved: async function (oEvent) {
//         //     debugger
// 		// 	var item = oEvent.getParameter("item");
//         //     var id = item.getBindingContext().getProperty("ID");
// 		// 	var urll = `/odata/v4/my/Files(ID=${id},IsActiveEntity=false)`

// 		// 	$.ajax({ 
//     	// 		url: urll,
//     	// 		method: "DELETE"
// 		// 	})
//         // },

//         onAfterItemRemoved: async function (oEvent) {
//             debugger
//             const regex = /^(.*?),IsActiveEntity=/;

//             let match = oEvent.mParameters.item.mProperties.url.match(regex);
//             let urll = match[1] + ",IsActiveEntity=false)";
//             $.ajax({
//                 url: urll,
//                 method: "DELETE"

//             })
//         },

//         //newwwww
//         onAfterItemEdited: async function(oEvent){
//             // var item = oEvent.getParameter("item");
//             // var id = item.getBindingContext().getProperty("ID");
// 			// var urll = `/odata/v4/my/Files(ID=${id},IsActiveEntity=false)`

// 			// $.ajax({ 
//     		// 	url: urll,
//     		// 	method: "PUT"
// 			// })


//             const regex = /^(.*?),IsActiveEntity=/;
//             let match = oEvent.mParameters.item.mProperties.url.match(regex);
//             let urll = match[1] + ",IsActiveEntity=false) ";

//             // Prepare the data payload for PATCH
//             let data = {
//                 fileName: oEvent.getParameter("item").getFileName(), // Example field to update
//                 // Add any other fields that need to be updated here
//             };

//             // Send PATCH request using jQuery's ajax method
//             $.ajax({
//                 url: urll,
//                 method: "PATCH",  // Use PATCH instead of PUT
//                 contentType: "application/json",  // Set content type to JSON
//                 data: JSON.stringify(data),  // Send the data as JSON string
//                 success: function (response) {
//                     // Handle success response
//                     console.log("Update successful:", response);
//                 },
//                 error: function (error) {
//                     // Handle error response
//                     console.error("Update failed:", error);
//                 }
//             });
//         },


      

//         onUploadCompleted: function (oEvent) {
//             debugger
//             var oUploadSet = this.byId("uploadSet"); // Adjust to get the correct reference
//             oUploadSet.removeAllIncompleteItems();
//             oUploadSet.getBinding("items").refresh();
//             // this.oItemToUpdate = null;
//             // this.byId("versionButton").setEnabled(false);
//         },

     

//         // onUploadSelectedButton: function () {
//         //     debugger
//         //     MessageToast.show("onUploadSelectedButton");
//         //     var oUploadSet = sap.ui.getCore().byId("uploadSet"); // Adjust to get the correct reference
//         //     oUploadSet.getItems().forEach(function (oItem) {
//         //         if (oItem.getListItem().getSelected()) {
//         //             oUploadSet.uploadItem(oItem);
//         //         }
//         //     });
//         // },

//         // onDownloadSelectedButton: function () {
//         //     debugger
//         //     MessageToast.show("onDownloadSelectedButton");

//         //     // Use the view's byId method to get the UploadSet control
//         //     var oUploadSet = this.byId("uploadSet");

//         //     if (!oUploadSet) {
//         //         MessageToast.show("UploadSet control not found.");
//         //         return;
//         //     }

//         //     // Iterate over items and download selected ones
//         //     oUploadSet.getItems().forEach(function (oItem) {
//         //         if (oItem.getListItem().getSelected()) {
//         //             oItem.download(true);
//         //         }
//         //     });
//         // },

//         // onSelectionChange: function () {
//         //     MessageToast.show("onSelectionChange");
//         //     var oUploadSet = sap.ui.getCore().byId("uploadSet"); // Adjust to get the correct reference
//         //     // If there's any item selected, sets version button enabled
//         //     if (oUploadSet.getSelectedItems().length > 0) {
//         //         if (oUploadSet.getSelectedItems().length === 1) {
//         //             sap.ui.getCore().byId("versionButton").setEnabled(true);
//         //         } else {
//         //             sap.ui.getCore().byId("versionButton").setEnabled(false);
//         //         }
//         //     } else {
//         //         sap.ui.getCore().byId("versionButton").setEnabled(false);
//         //     }
//         // },

//         // onVersionUpload: function (oEvent) {
//         //     MessageToast.show("onVersionUpload");
//         //     var oUploadSet = sap.ui.getCore().byId("UploadSet"); // Adjust to get the correct reference
//         //     this.oItemToUpdate = oUploadSet.getSelectedItems()[0];
//         //     oUploadSet.openFileDialog(this.oItemToUpdate);
//         // }
//     };
// });











//NEWW GLOBAL
sap.ui.define([
    "sap/m/MessageToast",
], function (MessageToast) {
    'use strict';
    var GlobalID;
    return {
        onAfterItemAdded: function (oEvent) {
            var oView = oEvent.getSource().getParent();
            var ttuuid = oView.getBindingContext().getProperty("ttuuid");
            debugger
            var item = oEvent.getParameter("item");


            var baseUrl = oEvent.oSource.getModel().getServiceUrl();


            var pattern = /Teacher.*$/;
            var match = window.location.href.match(pattern);
            if (match) {
                var entityUrl = match[0];
            }

            
            // Create Entity and Upload Content logic

            var data = {
                mediaType: item.getMediaType(),
                fileName: item.getFileName(),
                size: item.getFileObject().size,
                ttuuid: ttuuid

            };

            var hashPart = window.location.href.split('#')[1];


            var settings = {
                url: baseUrl + entityUrl + "/teacherToFiles",
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                data: JSON.stringify(data)
            };

            new Promise((resolve, reject) => {
                $.ajax(settings)
                    .done((results, textStatus, request) => {
                        resolve(results.ID);
                    })
                    .fail((err) => {
                        reject(err);
                    });
            }).then((id) => {
                var url = baseUrl + `Files(ID=${id},IsActiveEntity=false)/content`;
                var oUploadSet = this.byId("uploadSet");
                item.setUrl(url)
                oUploadSet.setUploadUrl(url); // Update the upload URL
                oUploadSet.setHttpRequestMethod("PUT"); // Set HTTP request method to PUT
                oUploadSet.uploadItem(item); // Upload the item
            }).catch((err) => {
                console.log(err);
            });

        },

        onUploadCompleted: function (oEvent) {

            var oUploadSet = this.byId("uploadSet"); // Adjust to get the correct reference
            oUploadSet.removeAllIncompleteItems();
            // oUploadSet.getBinding("items").refresh();
            MessageToast.show("Uploaded successfully!");

        },


        onOpenPressed: async function (oEvent) {
            debugger
            var baseUrl = oEvent.oSource.getModel().getServiceUrl();
            var fileurl;
            if(oEvent.oSource.mProperties.url.substring(0,6) === "/Files"){
                fileurl = baseUrl + oEvent.oSource.mProperties.url.substring(1);
            }
            if(fileurl){
                oEvent.oSource.mProperties.url = fileurl;
            }
            
            // let fileurl = oEvent.oSource.mProperties.url;
           
        },



        onAfterItemRemoved: async function (oEvent) {
            // debugger
            // var item = oEvent.getParameter("item");
            // var id = item.getBindingContext().getProperty("ID");
            // var urll = `/odata/v4/my/UploadedFiles(ID=${id},IsActiveEntity=false)`

            // $.ajax({ 
            // 	url: urll,
            // 	method: "DELETE"
            // })

            debugger
            var baseUrl = oEvent.oSource.getModel().getServiceUrl()
            const regex = /^(.*?),IsActiveEntity=/;

            let match = oEvent.mParameters.item.mProperties.url.match(regex);
            let urll = match[1] + ",IsActiveEntity=false)";
            urll = urll.replace(/^.*\/Files/, "/Files");
            $.ajax({
                url: baseUrl + urll,
                method: "DELETE"

            })
        },



        onAfterItemEdited: async function (oEvent) {
            // var item = oEvent.getParameter("item");
            // var id = item.getBindingContext().getProperty("ID");
            // var urll = `/odata/v4/my/UploadedFiles(ID=${id},IsActiveEntity=false)`

            // $.ajax({
            //     url: urll,
            //     method: "PUT"
            // })
            debugger
            var baseUrl = oEvent.oSource.getModel().getServiceUrl()
            const regex = /^(.*?),IsActiveEntity=/;
            let match = oEvent.mParameters.item.mProperties.url.match(regex);
            let urll = match[1] + ",IsActiveEntity=false) ";
            urll = urll.replace(/^.*\/Files/, "/Files");
            // Prepare the data payload for PATCH
            let data = {
                fileName: oEvent.getParameter("item").getFileName(), // Example field to update
                // Add any other fields that need to be updated here
            };

            // Send PATCH request using jQuery's ajax method
            $.ajax({
                url: baseUrl + urll,
                method: "PATCH",  // Use PATCH instead of PUT
                contentType: "application/json",  // Set content type to JSON
                data: JSON.stringify(data),  // Send the data as JSON string
                success: function (response) {
                    // Handle success response
                    console.log("Update successful:", response);
                },
                error: function (error) {
                    // Handle error response
                    console.error("Update failed:", error);
                }
            });
        },

    };
});








