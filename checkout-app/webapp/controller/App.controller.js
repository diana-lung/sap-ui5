sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/resource/ResourceModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/Fragment",
], function (Controller, MessageToast, ResourceModel, Filter, FilterOperator, Fragment) {
    "use strict";
    return Controller.extend("org.ubb.books.controller.App", {
        onInit: function () {

            // set i18n model on view
            var i18nModel = new ResourceModel({
                bundleName: "org.ubb.books.i18n.i18n"
            });
            this.getView().setModel(i18nModel, "i18n");
        },

        openCheckoutBooks: function (oEvent) {
            // this._getDialog().open();
            var oView = this.getView();

            // create dialog lazily
            if (!this.byId("id1")) {
                // load asynchronous XML fragment
                Fragment.load({
                    id: oView.getId(),
                    name: "org.ubb.books.view.CheckoutBooks",
                    controller: this
                }).then(function (oDialog) {
                    // connect dialog to the root view of this component (models, lifecycle)
                    oView.addDependent(oDialog);
                    oDialog.open();
                });
            } else {
                this.byId("id1").open();
            }
        },

        checkoutBook: function (oEvent) {
            const oResourceBundle = this.getView().getModel("i18n").getResourceBundle();
            const oDataModel = this.getView().getModel();
            const path = oEvent.getSource().getBindingContext().getPath()
            const oSelectedItem = oEvent.getSource().getBindingContext().getObject();
            if (oSelectedItem.AvailableNr !== 0) {
                oSelectedItem.AvailableNr -= 1;
                oDataModel.update(path, oSelectedItem);
            } else {
                MessageToast.show(oResourceBundle.getText("noBooks"));
            }
        },

        openFilterDialog: function () {
            if (!this.filterDialog) {
                this.filterDialog = sap.ui.xmlfragment("org.ubb.books.view.FilterBooks", this);
            }
            this.getView().addDependent(this.filterDialog);
            this.filterDialog.open();
        },

        filterBooks: function (event) {
            let isbn = '', title = '', author = '', date1 = '', date2 = '', language = '', date;
            const oSimpleForm = sap.ui.getCore().byId("filterBookForm");
            let oFields = oSimpleForm.getContent();
            let oControl = oFields[1];
            isbn = oControl.getValue();
            oControl = oFields[3];
            title = oControl.getValue();
            oControl = oFields[5];
            author = oControl.getValue();
            oControl = oFields[7];
            if (oControl.getValue().length !== 0) {
                date1 = oControl.getValue();
            }
            oControl = oFields[9];
            if (oControl.getValue().length !== 0) {
                date2 = oControl.getValue();
            }
            oControl = oFields[11];
            language = oControl.getValue();

            const aFilter = [];
            const oList = this.getView().byId("idBooksTable");
            const oBinding = oList.getBinding("items");

            // Push set filters
            if (isbn) {
                aFilter.push(new Filter("Isbn", FilterOperator.Contains, isbn))
            }
            if (author) {
                aFilter.push(new Filter("Author", FilterOperator.Contains, author));
            }
            if (title) {
                aFilter.push(new Filter("Title", FilterOperator.Contains, title));
            }
            if (date1 && date2) {
                aFilter.push(new Filter("PublishDate", FilterOperator.BT, date1, date2));
            }
            if (language) {
                if (language === 'RO')
                    language = '4';
                if (language === 'DE')
                    language = 'D';
                if (language === 'EN')
                    language = 'E';

                aFilter.push(new Filter("Language", FilterOperator.Contains, language));
            }
            oBinding.filter(aFilter);
            this.filterDialog.close();
        },

        closeFilterDialog: function (oEvent) {
            this.filterDialog.close();
        },

        closeCheckoutBooks: function (oEvent) {
            this._getDialog().close();
        },

        _getDialog: function () {
            if (!this._oDialog) {
                this._oDialog = sap.ui.xmlfragment("org.ubb.books.view.CheckoutBooks", this);
                this.getView().addDependent(this._oDialog);
                const oModel = new sap.ui.model.json.JSONModel();
                this._oDialog.setModel(oModel);
            }
            return this._oDialog;
        },
    });
});
