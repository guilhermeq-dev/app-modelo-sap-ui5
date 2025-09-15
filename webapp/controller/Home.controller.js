sap.ui.define([
    "../controller/BaseController",
    "sap/m/MessageBox",
    "com/treinamento/firstapp/model/models",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "com/treinamento/firstapp/model/formatter",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
    */
    function (BaseController, MessageBox, models, Filter, FilterOperator, formatter, JSONModel) {
        "use strict";

        return BaseController.extend("com.treinamento.firstapp.controller.Home", {
            formatter: formatter,

            onInit: function () {
                this.setProductsModel();
            },
            setProductsModel: function () {
                const products = models.getProducts();
                const table = this.byId("table");
                table.setBusy(true);
                products
                    .then((oProductsModel) => {
                        this.setModel(oProductsModel, 'products');

                    })
                    .catch((oError) => {
                        MessageBox.error(oError);

                    })
                    .finally(() => {
                        table.setBusy(false);
                    });
            },
            handleCreateProduct: function () {
                const viewId = this.getView().getId();

                const oData = {
                    ID: undefined,
                    Name: "",
                    Description: "",
                    Rating: undefined,
                    Price: undefined
                };

                const oCreateModel = new JSONModel(oData);
                this.setModel(oCreateModel, "createProduct");

                if (!this._createDialog) {
                    this._createDialog = sap.ui.xmlfragment(viewId, "com.treinamento.firstapp.view.fragments.CreateProduct", this);
                    this.getView().addDependent(this._createDialog);
                };

                this._createDialog.open();
            },
            onCreateProduct: function () {
                const oCreateModel = this.getModel('createProduct');
                const oData = oCreateModel.getData();
                models.createProduct(oData)
                    .then((res) => {
                        this.setProductsModel();
                        MessageBox.success(`Produto '${res.Name}' criado com sucesso!`);
                        this._createDialog.close();
                    })
                    .catch((oError) => {
                        MessageBox.error(oError);
                    });
            },
            handleDeleteProduct: function (oEvent) {
                const oSelectedItem = oEvent.getSource();
                const sProduct = oSelectedItem.getBindingContext("products").getProperty('ID');

                MessageBox.confirm("Tem certeza que deseja excluir este produto?", {
                    title: "Alerta", icon: MessageBox.Icon.WARNING, onClose: (oAction) => {
                        if (oAction === MessageBox.Action.OK) {
                            models.deleteProduct(sProduct)
                                .then(() => {
                                    this.setProductsModel();
                                    MessageBox.success(`Produto removido com sucesso!`);
                                })
                                .catch((oError) => {
                                    MessageBox.error(oError);
                                });
                        }
                    }
                });
            },
            handleEditProduct: function (oEvent) {
                const oSelectedItem = oEvent.getSource();
                const sProduct = oSelectedItem.getBindingContext("products").getObject();

                const oData = {
                    ID: sProduct.ID,
                    Name: sProduct.Name,
                    Description: sProduct.Description,
                    Rating: sProduct.Rating,
                    Price: sProduct.Price
                };

                const oEditModel = new JSONModel(oData);
                this.setModel(oEditModel, "editProduct");

                if (!this._editDialog) {
                    this._editDialog = sap.ui.xmlfragment(this.getView().getId(), "com.treinamento.firstapp.view.fragments.EditProduct", this);
                    this.getView().addDependent(this._editDialog);
                };

                this._editDialog.open();
            },
            onEditProduct: function () {
                const oEditModel = this.getModel('editProduct');
                const oData = oEditModel.getData();
                models.updateProduct(oData.ID, oData)
                    .then(() => {
                        this.setProductsModel();
                        MessageBox.success(`Produto atualizado com sucesso!`);
                        this._editDialog.close();
                    })
                    .catch((oError) => {
                        MessageBox.error(oError);
                    });
            },
            onCloseDialog: function (oEvent) {
                const dialog = oEvent.getSource().getParent();
                dialog.close();
            },
        });
    });