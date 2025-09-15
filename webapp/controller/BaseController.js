sap.ui.define(
  [
    "sap/ui/core/mvc/Controller"
  ],
  function (BaseController) {
    "use strict";

    return BaseController.extend("com.treinamento.firstapp.controller.BaseController", {
      navTo: function (sRouteName, oParameters) {

        const params = oParameters || {};

        this.getOwnerComponent().getRouter().navTo(sRouteName, params);
      },
      getModel: function (sModelName) {
        return this.getView().getModel(sModelName);
      },
      setModel: function (oModel, sModelName) {
        return this.getView().setModel(oModel, sModelName);
      },
    });
  }
);
