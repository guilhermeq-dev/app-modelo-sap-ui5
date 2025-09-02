sap.ui.define([
    "com/lab2dev/firstapp/controller/BaseController",
    "sap/m/MessageBox",
    "com/lab2dev/firstapp/model/models",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "com/lab2dev/firstapp/model/formatter",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
    */
    function (Controller, MessageBox, models, Filter, FilterOperator, formatter, JSONModel) {
        "use strict";

        return Controller.extend("com.lab2dev.firstapp.controller.Home", {
            formatter: formatter,

            onInit: function () {
                this.params = {
                    urlParameters: {
                        $expand: "Category"
                    }
                };

                this.setProductsModel();
            },
            setProductsModel: function () {
                const products = models.getProducts(this.params);
                const table = this.byId("table");
                table.setBusy(true);
                products
                    .then((oProductsModel) => {
                        this.getView().setModel(oProductsModel, 'products');

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
                this.getView().setModel(oCreateModel, "createProduct");

                if (!this.createDialog) {
                    this.createDialog = sap.ui.xmlfragment(viewId, "com.lab2dev.firstapp.view.fragments.CreateProduct", this);
                    this.getView().addDependent(this.createDialog);
                };

                this.createDialog.open();
            },
            onCreateProduct: function () {
                const oCreateModel = this.getView().getModel("createProduct");
                const oData = oCreateModel.getData();
                models.createProduct(oData)
                    .then((res) => {
                        this.setProductsModel();
                        MessageBox.success(`Produto '${res.Name}' criado com sucesso!`);
                        this.createDialog.close();
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
                this.getView().setModel(oEditModel, "editProduct");

                if (!this.editDialog) {
                    this.editDialog = sap.ui.xmlfragment(this.getView().getId(), "com.lab2dev.firstapp.view.fragments.EditProduct", this);
                    this.getView().addDependent(this.editDialog);
                };

                this.editDialog.open();
            },
            onEditProduct: function () {
                const oEditModel = this.getView().getModel("editProduct");
                const oData = oEditModel.getData();
                models.updateProduct(oData.ID, oData)
                    .then(() => {
                        this.setProductsModel();
                        MessageBox.success(`Produto atualizado com sucesso!`);
                        this.editDialog.close();
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