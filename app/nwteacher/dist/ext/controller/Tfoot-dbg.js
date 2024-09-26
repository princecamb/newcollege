sap.ui.define([
    "sap/m/MessageToast"
], function(MessageToast) {
    'use strict';

    return {
        tfoot_meth: function(oEvent) {
            MessageToast.show("Custom handler invoked.");
        }
    };
});
