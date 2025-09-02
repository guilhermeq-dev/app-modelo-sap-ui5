sap.ui.define([
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/odata/v2/ODataModel",
    "sap/ui/Device"
],
    /**
     * provide app-view type models (as in the first "V" in MVVC)
     * 
     * @param {typeof sap.ui.model.json.JSONModel} JSONModel
     * @param {typeof sap.ui.Device} Device
     * 
     * @returns {Function} createDeviceModel() for providing runtime info for the device the UI5 app is running on
     */
    function (JSONModel, ODataModel, Device) {
        "use strict";

        return {
            createDeviceModel: function () {
                const oModel = new JSONModel(Device);
                oModel.setDefaultBindingMode("OneWay");
                return oModel;
            },
            getODataModel: function () {
                const oDataModel = new ODataModel("/V2/(S(44k0muiv12ppx2zo4oiptso1))/OData/OData.svc/", { useBatch: false });

                return new Promise(function (resolve, reject) {
                    oDataModel.attachMetadataLoaded(() => {
                        resolve(oDataModel);
                    });
                    oDataModel.attachMetadataFailed(() => {
                        reject("Serviço indisponível no momento.");
                    });
                });
            },
            getProducts: function (oURLParam) {
                const oDataModel = this.getODataModel();

                return new Promise((resolve, reject) => {
                    oDataModel
                        .then((oModel) => {
                            oModel.read("/Products", {
                                ...oURLParam,
                                success: (oData) => {
                                    resolve(new JSONModel(oData.results));
                                },
                                error: (oError) => {
                                    reject(oError);
                                }
                            });
                        })
                        .catch((oError) => {
                            reject(oError);
                        });
                });

            },
            createProduct: function (data) {
                const oDataModel = this.getODataModel();

                return new Promise((resolve, reject) => {
                    oDataModel
                        .then((oModel) => {
                            oModel.create("/Products", data, {
                                success: (oData) => {
                                    resolve(oData);
                                },
                                error: (oError) => {
                                    reject(oError);
                                }
                            });
                        })
                        .catch((oError) => {
                            reject(oError);
                        });
                });
            },
            deleteProduct: function (sProductId) {
                const oDataModel = this.getODataModel();

                return new Promise((resolve, reject) => {
                    oDataModel
                        .then((oModel) => {
                            oModel.remove(`/Products(${sProductId})`, {
                                success: () => {
                                    resolve();
                                },
                                error: (oError) => {
                                    reject(oError);
                                }
                            });
                        })
                        .catch((oError) => {
                            reject(oError);
                        });
                });
            },
            updateProduct: function (sProductId, data) {
                const oDataModel = this.getODataModel();

                return new Promise((resolve, reject) => {
                    oDataModel
                        .then((oModel) => {
                            oModel.update(`/Products(${sProductId})`, data, {
                                success: (oData) => {
                                    resolve(oData);
                                },
                                error: (oError) => {
                                    reject(oError);
                                }
                            });
                        })
                        .catch((oError) => {
                            reject(oError);
                        });
                });
            }
        };
    });