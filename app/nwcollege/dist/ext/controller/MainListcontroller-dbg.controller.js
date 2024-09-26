// sap.ui.define(['sap/ui/core/mvc/ControllerExtension'], function (ControllerExtension) {
// 	'use strict';

// 	return ControllerExtension.extend('nwcollege.ext.controller.MainListcontroller', {
// 		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
// 		override: {
// 			/**
//              * Called when a controller is instantiated and its View controls (if available) are already created.
//              * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
//              * @memberOf nwcollege.ext.controller.MainListcontroller
//              */
// 			onInit: function () {
// 				// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
// 				var oModel = this.base.getExtensionAPI().getModel();
// 			}
// 		}
// 	});
// });






sap.ui.define([
    'sap/ui/core/mvc/ControllerExtension',
    'jquery.sap.global',
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator" // Ensure jQuery is available
], function (ControllerExtension, jQuery,Filter, FilterOperator) {
    'use strict';


    var oUser;


    return ControllerExtension.extend('collauth.ext.controller.UserEmail', {
        // this section allows to extend lifecycle hooks or hooks provided by Fiori elements
        override: {
            /**
             * Called when a controller is instantiated and its View controls (if available) are already created.
             * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
             * @memberOf collegelink.ext.controller.ListController
             */
            onInit: function () {
                // Access the Fiori elements extensionAPI via this.base.getExtensionAPI
                var oModel = this.base.getExtensionAPI().getModel();
                debugger; // Use for debugging purposes
                var oUserdata = new sap.ushell.services.UserInfo().getEmail();
                oUser = oUserdata;
             
                // alert(oUser);
                // oUser = 'prince.kumar@peolsolutions.com';
                // Any additional initialization logic can go here
            },






           


            /**
             * Called before the view is rendered.
             * This is a suitable place to execute code before binding occurs.
             */
            onBeforeRendering: async function () {
                // Access the Fiori elements extensionAPI via this.base.getExtensionAPI
                debugger; // Use for debugging purposes
                var oModel = this.base.getExtensionAPI().getModel();


                if (!oModel) {
                    console.error('Model is not available.');
                    return;
                }


                var sServiceUrl;
                if (typeof oModel.getServiceUrl === "function") {
                    sServiceUrl = oModel.getServiceUrl(); // For V4 OData models
                    console.log('Service URL:', sServiceUrl);
                } else {
                    console.error('Unable to determine the service URL.');
                    return;
                }


                //editing status and filter bar
                const filterId = this.base.getView().getContent()[0].mAggregations.content.mAggregations.content.mAssociations.filter;


                // Perform any asynchronous operations here using jQuery AJAX
                try {
                    const response = await new Promise((resolve, reject) => {
                        jQuery.ajax({
                            url: sServiceUrl + "/Department", // Adjust 'YourEntitySet' as needed
                            method: "GET",
                            dataType: "json",
                            success: function (data) {
                                resolve(data);
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                reject(new Error(textStatus + ': ' + errorThrown));
                            }
                        });
                    });


                    console.log('Fetched data:', response);
                    // Log the DepartmentName from the response
                    if (response && response.value) {
                        response.value.forEach(function(department) {
                            console.log('Department Name:', department.DepartmentName);
                        });
                    } else {
                        console.log('No data found or invalid response format');
                    }
                } catch (error) {
                    console.error('Error fetching data', error);
                }
               
                //For fetching data from roll
                // Fetch data from Roll entity
                try {
                    const rollResponse = await new Promise((resolve, reject) => {
                        jQuery.ajax({
                            url: sServiceUrl + "/AAuthorized", // Adjust 'YourEntitySet' as needed
                            method: "GET",
                            dataType: "json",
                            success: function (data) {
                                resolve(data);
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                reject(new Error(textStatus + ': ' + errorThrown));
                            }
                        });
                    });


                    console.log('Fetched Authorization data:', rollResponse);


                    var userRole;
                    if (rollResponse && rollResponse.value) {
                        rollResponse.value.forEach(function (authName) {
                            if (authName.authEmail === oUser) {
                                userRole = authName.authName;
                            }
                            // if (roll.Email === 'mailto:aditya.yadav@peolsolutions.com') {
                            //     userRole = roll.roll;
                            // }
                        }.bind(this));
                    } else {
                        console.log('No data found or invalid response format');
                    }

                    //draft
                    var oTable = this.getView().findAggregatedObjects(true, function (control) {
                        return control.isA("sap.ui.table.Table") || control.isA("sap.m.Table");
                    })[0];
                    debugger
                    var oBinding = oTable.getBinding("items");
    


                    if (userRole !== 'Owner') {
                        // Hide "Create" and "Delete" buttons if the user is not an admin
                        this.base.getView().findAggregatedObjects(true, function (control) {
                            return control.isA("sap.m.Button");
                        }).forEach(function (oButton) {
                            if (oButton.getId().includes("Create") || oButton.getId().includes("Delete")) {
                                oButton.setVisible(false);
                            }
                        });
                      
                        var oFilterBar = sap.ui.getCore().byId(filterId);
                        //draft hide top filter bar and editing status
                    var oFilterConditions = {
                        "$editState": [ 
                            {
                                "operator": "DRAFT_EDIT_STATE",
                                "values": [
                                    "ALL_HIDING_DRAFTS",
                                    "All (Hiding Drafts)"
                                ],
                                "validated": "Validated"
                            }
                        ]
                    };

                    //draft hide if user is not admin
                    if (oBinding) {
                        var oFilter = new Filter({
                            path: "IsActiveEntity",
                            operator: FilterOperator.EQ,
                            value1: true
                        });

                    oBinding.filter([oFilter]);
                    }
                    oFilterBar.setFilterConditions(oFilterConditions);

                   

                    // Hide or disable draft-related controls
                    // this.base.getView().findAggregatedObjects(true, function (control) {
                    //     return control.isA("sap.m.Button") && (control.getId().includes("Draft") || control.getId().includes("Save"));
                    // }).forEach(function (oButton) {
                    //     oButton.setVisible(false); // Hide draft-related buttons
                    // });

                    // this.base.getView().findAggregatedObjects(true, function (control) {
                    //     return control.isA("sap.m.Input") && control.getId().includes("Draft");
                    // }).forEach(function (oInput) {
                    //     oInput.setEditable(false); // Set draft-related fields to read-only
                    // });


                         // Hide FilterBar control if user is not an admin
                         this.base.getView().findAggregatedObjects(true, function (control) {
                            return control.isA("sap.fe.macros.controls.FilterBar");
                        }).forEach(function (oFilterBar) {
                            oFilterBar.setVisible(false);
                        });


                    }
                } catch (error) {
                    console.error('Error fetching Roll data', error);
                }


                // Additional logic can be added here after the service URL is retrieved and data is fetched
            }


            }
       
   
    });
});
































