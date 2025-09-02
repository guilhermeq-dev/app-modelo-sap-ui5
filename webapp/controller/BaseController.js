sap.ui.define(
  [
    "sap/ui/core/mvc/Controller"
  ],
  function (BaseController) {
    "use strict";

    return BaseController.extend("com.lab2dev.firstapp.controller.BaseController", {
      navTo: function (sRouteName, oParameters) {

        const params = oParameters || {};

        this.getOwnerComponent().getRouter().navTo(sRouteName, params);
      }
    });
  }
);
