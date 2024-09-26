// sap.ui.define(
//     [
//         "sap/ui/core/mvc/Controller"
//     ],
//     function(BaseController) {
//       "use strict";
  
//       return BaseController.extend("nwcollegetask.workflowuimodule.controller.App", {
//         onInit() {
//         },
//         onBeforeRendering(oContex){
//           debugger
//           var oView = this.getView();

//           var oData = oView.oPropagatedProperties.oModels.context.oData;
//           var pdfDocumentValue = oData.pdfDocument;
//           var baseUrl = "https://25728e9btrial-developer05-nwcollege-srv.cfapps.us10-001.hana.ondemand.com/odata/v4/my/";

//             // Perform an AJAX call to get the PDF links
//             $.ajax({
//               url: baseUrl + pdfDocumentValue,
//               method: "GET",
//               success: function(oData) {
//                   var oModel = new sap.ui.model.json.JSONModel();
//                   oModel.setData({ Files: oData.value }); // Assign the array directly
//                   oView.setModel(oModel, "myModel"); // Set the model with name "myModel"
//               },
//               error: function(jqXHR, textStatus, errorThrown) {
//                   console.error("Error in fetching data: " + textStatus + ': ' + errorThrown);
//               }
//           });
//           var oUploadSet = this.byId("uploadSet");
//         },
//         onOpenPressed: function (oEvent) {
//           debugger
//           var baseUrl = "https://25728e9btrial-developer05-nwcollege-srv.cfapps.us10-001.hana.ondemand.com/odata/v4/my/"; //oEvent.oSource.getModel().getServiceUrl();
//           let fileurl = oEvent.oSource.mProperties.url;
//           var pattern = /Files.*$/;
//           var match = fileurl.match(pattern);
//           if (match) {
//             var entityUrl = baseUrl + match[0];
//           }
//           oEvent.oSource.mProperties.url = entityUrl;
//         }
//       });
//     }
//   );






// //new
sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
  ],
  function (BaseController, JSONModel) {
    "use strict";

    return BaseController.extend("nwcollegetask.workflowuimodule.controller.App", {
      onInit() {
        // Defer the execution to after the view is rendered
        this.getView().addEventDelegate({
          onAfterRendering: () => {
            this.onBeforeRendering();
          }
        });
      },

      onBeforeRendering(oEvent) {
        // Use setTimeout to delay execution
        setTimeout(() => {
          var oUploadSet = this.byId("uploadSet");

          var oView = this.getView();
          var urll = oView.oPropagatedProperties.oModels.context.oData.pdfDocument;
          console.log(urll);

          const link = "https://a9929629trial-devprince-nwcollege-srv.cfapps.us10-001.hana.ondemand.com/odata/v4/my/";
          var finalLink = link + urll;

          this._fetchPDFLinks(finalLink)
            .then(function(oData) {
              var oModel = new sap.ui.model.json.JSONModel();
              oModel.setData({ Files: oData.value }); // Assign the array directly
              oView.setModel(oModel, "myModel"); // Set the model with name "myModel"
            })
            .catch(function(error) {
              console.error("Error in fetching data: " + error);
            });
        }, 400); // Delay of 100ms, you can adjust this if necessary
      },

      _fetchPDFLinks: function(url) {
        return new Promise(function(resolve, reject) {
          $.ajax({
            url: url,
            method: "GET",
            success: function(oData) {
              resolve(oData);
            },
            error: function(jqXHR, textStatus, errorThrown) {
              reject(textStatus + ': ' + errorThrown);
            }
          });
        });
      },

      onOpenPressed: function (oEvent) {
        var baseUrl = "https://a9929629trial-devprince-nwcollege-srv.cfapps.us10-001.hana.ondemand.com/odata/v4/my/";
        let fileurl = oEvent.getSource().getUrl();
        var pattern = /Files.*$/;
        var match = fileurl.match(pattern);
        if (match) {
          var entityUrl = baseUrl + match[0];
        }
        oEvent.getSource().setUrl(entityUrl);
      }
    });
  }
);






