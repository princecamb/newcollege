// sap.ui.define(['sap/ui/core/mvc/ControllerExtension'], function (ControllerExtension) {
// 	'use strict';

// 	return ControllerExtension.extend('nwcollege.ext.controller.Departmentobjectcontrol', {
// 		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
// 		override: {
// 			/**
//              * Called when a controller is instantiated and its View controls (if available) are already created.
//              * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
//              * @memberOf nwcollege.ext.controller.Departmentobjectcontrol
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
    'jquery.sap.global' // Ensure jQuery is available
], function (ControllerExtension, jQuery) {
    'use strict';

    var oUser;
	return ControllerExtension.extend('nwcollege.ext.controller.Departmentobjectcontrol', {
        // this section allows to extend lifecycle hooks or hooks provided by Fiori elements
        override: {
            onInit: function () {
                // Access the Fiori elements extensionAPI via this.base.getExtensionAPI
                var oModel = this.base.getExtensionAPI().getModel();
                debugger; // Use for debugging purposes
                var oUserdata = new sap.ushell.services.UserInfo().getEmail();
                oUser = oUserdata;
                // alert(oUser);
                // debugger
                // oUser = 'prince.kumar@peolsolutions.com';
                // Any additional initialization logic can go here
            },


            routing: {
                onBeforeBinding: async function (oBindingContext) {
                    debugger;
                    console.log("onBeforeBinding called with context:", oBindingContext);


                    if (oBindingContext) {
                        console.log("Binding Context Path:", oBindingContext.getPath());
                    } else {
                        console.log("No binding context available.");
                        return;
                    }


                    // Access the Fiori elements extensionAPI via this.base.getExtensionAPI
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
                            response.value.forEach(function (department) {
                                console.log('Department Name:', department.DepartmentName);
                            });
                        } else {
                            console.log('No data found or invalid response format');
                        }
                    } catch (error) {
                        console.error('Error fetching data', error);
                    }


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
                            debugger
                            rollResponse.value.forEach(function (authName) {
                                if (authName.authEmail === oUser) {
                                    userRole = authName.authName;
                              
                                }
                            });
                        } else {
                            console.log('No data found or invalid response format');
                        }
                      
                        // Extract DepartmentID from the URL
                        var sCurrentUrl = window.location.href;
                        var hashIndex = sCurrentUrl.indexOf("#");
                        var sHash = sCurrentUrl.substring(hashIndex + 1);
                        var sDepartmentId;


                        // Check if the hash contains the department information
                        if (sHash.includes("DepartmentID")) {
                            // Extract the part containing DepartmentID
                            console.log("hellllo");
                            var idPart = sHash.match(/DepartmentID='([^']+)'/);
                            if (idPart && idPart[1]) {
                                sDepartmentId = idPart[1]; // Extracted DepartmentID
                            }
                        }
                        console.log("current url", sCurrentUrl);
                        console.log("sds");
                        console.log("original hash", hashIndex);
                        console.log("sadad", sHash);
                        console.log("Department id", sDepartmentId);
                        console.log("ndnd");


                        // Logic for enabling/disabling buttons
                        this.base.getView().findAggregatedObjects(true, function (control) {
                            return control.isA("sap.m.Button") || control.isA("sap.m.Input");
                        }).forEach(function (control) {
                            if (control.isA("sap.m.Button")) {
                                if (control.getId().includes("Create") || control.getId().includes("Delete") || control.getId().includes("Edit")) {
                                    if ((userRole === 'MCA' && sDepartmentId === 'D2') || userRole === 'Owner') {
                                        control.setEnabled(true); // Enable buttons for MCA department
                                    }


                                    else if ((userRole === 'cse' && sDepartmentId === 'D1') || userRole === 'Owner') {
                                        control.setEnabled(true); // Enable buttons for MCA department
                                    }
                                    else {
                                        control.setEnabled(false); // Disable buttons for other departments
                                    }
                                }
                            }
                            else if (control.isA("sap.m.Input") && control.getId().includes("DepartmentName")) {
                                // Assuming the ID of the DepartmentName input field contains "DepartmentName"
                                control.setEnabled(userRole === 'Owner'); // Make read-only for non-admin users
                            }








                        });


                    } catch (error) {
                        console.error('Error fetching Roll data', error);
                    }
                }
            }
        }


    });
});



