sap.ui.define([
    "sap/ui/model/odata/v2/ODataModel",
],
    function (ODataModel) {
        "use strict";

        return {

            init: function (oComponent) {
                this._oComponent = oComponent
                const uri = "V2/(S(44k0muiv12ppx2zo4oiptso1))/OData/OData.svc/";
                const url = this._oComponent.getManifestObject().resolveUri(uri);
                this.odata = new ODataModel(url, { useBatch: false });
            },

            getOwnerComponent: function () {
                return this._oComponent
            },
            update: function (path, data, options = {}) {
                return new Promise((success, error) => {
                    this.odata.update(path, data, {
                        ...options,
                        success: (response) => {
                            success(response)
                        },
                        error
                    })
                })
            },
            remove: function (path, options = {}) {
                return new Promise((success, error) => {
                    this.odata.remove(path, {
                        ...options,
                        success: () => {
                            success()
                        },
                        error
                    })
                })
            },
            create: function (path, data, options = {}) {
                return new Promise((success, error) => {
                    this.odata.create(path, data, {
                        ...options,
                        success: (response) => {
                            return success(response)
                        },
                        error
                    })
                })
            },
            read: function (path, parameters) {
                return new Promise((success, error) => {
                    this.odata.read(path, {
                        ...parameters,
                        success: (data) => {
                            if ("results" in data) {
                                return success(data.results)
                            }

                            return success(data)
                        },
                        error
                    })
                })
            }
        }
    }
)