sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
  ],
  function (BaseController, JSONModel) {
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
        return this.getView().setModel(new JSONModel(oModel), sModelName);
      },
      
      setBusy: function (boolean) {
        return this.getView().setBusy(boolean);
      },
    });
  }
);
