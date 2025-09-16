/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/Device",
    "com/treinamento/firstapp/model/models",
    "com/treinamento/firstapp/connection/connector"
],
    function (UIComponent, Device, models, connector) {
        "use strict";

        return UIComponent.extend("com.treinamento.firstapp.Component", {
            metadata: {
                manifest: "json"
            },

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init: function () {
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);

                // enable routing
                this.getRouter().initialize();

                // models init
                models.init(this)

                // connector init
                connector.init(this);

                // set the device model
                this.setModel(models.createDeviceModel(), "device");
            }
        });
    }
);