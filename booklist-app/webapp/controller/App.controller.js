sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/resource/ResourceModel"
], function (Controller, MessageToast, ResourceModel) {
    "use strict";
    return Controller.extend("org.ubb.books.controller.App", {

        /*open add book dialog window*/
        openAddDialog: function () {
            if (!this.newBookDialog) {
                this.newBookDialog = sap.ui.xmlfragment("org.ubb.books.view.CreateBook", this);
            }
            this.getView().addDependent(this.newBookDialog);
            this.newBookDialog.open();
        },

        /*open update dialog window*/
        openUpdateDialog: function (oEvent) {
            if (!this.updateBookDialog) {
                this.updateBookDialog = sap.ui.xmlfragment("org.ubb.books.view.UpdateBook", this);
            }
            this.getView().addDependent(this.updateBookDialog);
            const oSelectedItem = oEvent.getSource().getBindingContext().getObject();
            const aItems = this.updateBookDialog.getContent()[0].getContent();
            let oControl = aItems[1];
            oControl.setValue(oSelectedItem.Isbn);
            oControl = aItems[3];
            oControl.setValue(oSelectedItem.Title);
            oControl = aItems[5];
            oControl.setValue(oSelectedItem.Author);
            oControl = aItems[7];
            const dateFormat = sap.ui.core.format.DateFormat.getDateInstance({pattern: "dd-MM-YYYY"});
            const dateFormatted = dateFormat.format(oSelectedItem.PublishDate);
            oControl.setValue(dateFormatted);
            oControl = aItems[9];
            oControl.setValue(oSelectedItem.Language);
            oControl = aItems[11];
            oControl.setValue(oSelectedItem.TotalNr);
            oControl = aItems[13];
            oControl.setValue(oSelectedItem.AvailableNr);

            this.updateBookDialog.open();
        },

        addBook: function (oEvent) {
            let bCreate = true;
            const oBook = {
                Isbn: "",
                Title: "",
                Author: "",
                PublishDate: "",
                Language: "",
                TotalNr: 0,
                AvailableNr: 0
            };
            const oSimpleForm = sap.ui.getCore().byId("addBookForm");
            let oFields = oSimpleForm.getContent();
            let oControl = oFields[1];
            if (oControl.getValue().length !== 0) {
                oBook.Isbn = oControl.getValue();
                oControl.setValueState("None");
            } else {
                bCreate = false;
                oControl.setValueState("Error");
            }
            oControl = oFields[3];
            if (oControl.getValue().length !== 0) {
                oBook.Title = oControl.getValue();
                oControl.setValueState("None");
            } else {
                bCreate = false;
                oControl.setValueState("Error");
            }
            oControl = oFields[5];
            if (oControl.getValue().length !== 0) {
                oBook.Author = oControl.getValue();
                oControl.setValueState("None");
            } else {
                bCreate = false;
                oControl.setValueState("Error");
            }
            oControl = oFields[7];
            if (oControl.getValue().length !== 0) {
                oBook.PublishDate = this.getODataDateFromDatePicker(oControl.getValue());
                oControl.setValueState("None");
            } else {
                bCreate = false;
                oControl.setValueState("Error");
            }
            oControl = oFields[9];
            if (oControl.getValue().length !== 0) {
                oBook.Language = oControl.getValue();
                oControl.setValueState("None");
            } else {
                bCreate = false;
                oControl.setValueState("Error");
            }
            oControl = oFields[11];
            if (oControl.getValue().length !== 0) {
                oBook.TotalNr = parseInt(oControl.getValue());
                oControl.setValueState("None");
            } else {
                bCreate = false;
                oControl.setValueState("Error");
            }
            oControl = oFields[13];
            if (oControl.getValue().length !== 0) {
                oBook.AvailableNr = parseInt(oControl.getValue());
                oControl.setValueState("None");
            } else {
                bCreate = false;
                oControl.setValueState("Error");
            }
            this.getView().getModel().setUseBatch(false);
            if (bCreate) {
                const oResourceBundle = this.getView().getModel("i18n").getResourceBundle();
                this.getView().getModel().create('/Books', oBook, {
                    success: function (data) {
                        MessageToast.show(oResourceBundle.getText("successAdd"));
                    },
                    error: function (e) {
                        MessageToast.show(oResourceBundle.getText("errorAdd"));
                    }
                });
                this.newBookDialog.close();
            }
        },

        /*open update dialog window*/
        updateBook: function (oEvent) {
            let bCreate = true;
            const oBook = {
                Isbn: "",
                Title: "",
                Author: "",
                PublishDate: "",
                Language: "",
                TotalNr: "",
                AvailableNr: "",
            };
            const oSimpleForm = sap.ui.getCore().byId("updateBookForm");
            let oFields = oSimpleForm.getContent();
            let oControl = oFields[1];

            if (oControl.getValue().length !== 0) {
                oBook.Isbn = oControl.getValue();
                oControl.setValueState("None");
            } else {
                bCreate = false;
                oControl.setValueState("Error");
            }
            oControl = oFields[3];
            if (oControl.getValue().length !== 0) {
                oBook.Title = oControl.getValue();
                oControl.setValueState("None");
            } else {
                bCreate = false;
                oControl.setValueState("Error");
            }
            oControl = oFields[5];
            if (oControl.getValue().length !== 0) {
                oBook.Author = oControl.getValue();
                oControl.setValueState("None");
            } else {
                bCreate = false;
                oControl.setValueState("Error");
            }
            oControl = oFields[7];
            if (oControl.getValue().length !== 0) {
                oBook.PublishDate = this.getODataDateFromDatePicker(oControl.getValue());
                oControl.setValueState("None");
            } else {
                bCreate = false;
                oControl.setValueState("Error");
            }
            oControl = oFields[9];
            if (oControl.getValue().length !== 0) {
                oBook.Language = oControl.getValue();
                oControl.setValueState("None");
            } else {
                bCreate = false;
                oControl.setValueState("Error");
            }
            oControl = oFields[11];
            if (oControl.getValue().length !== 0) {
                oBook.TotalNr = parseInt(oControl.getValue());
                oControl.setValueState("None");
            } else {
                bCreate = false;
                oControl.setValueState("Error");
            }
            oControl = oFields[13];
            if (oControl.getValue().length !== 0) {
                oBook.AvailableNr = parseInt(oControl.getValue());
                oControl.setValueState("None");
            } else {
                bCreate = false;
                oControl.setValueState("Error");
            }
            this.getView().getModel().setUseBatch(false);
            if (bCreate) {
                const oResourceBundle = this.getView().getModel("i18n").getResourceBundle();
                this.getView().getModel().update("/Books(Isbn='" + oBook.Isbn + "')", oBook, {
                    success: function (data) {
                        MessageToast.show(oResourceBundle.getText("successUpdate"));
                    },
                    error: function (e) {
                        MessageToast.show(oResourceBundle.getText("errorUpdate"));
                    }
                });
                this.updateBookDialog.close();
            }
        },

        /*delete operation*/
        deleteRecord: function (oEvent) {
            const oResourceBundle = this.getView().getModel("i18n").getResourceBundle();
            const oModel = this.getView().getModel();
            const oSelectedItem = oEvent.getSource().getBindingContext().getObject();
            const oRecordId = oSelectedItem.Isbn;

            oModel.remove("/Books(Isbn='" + oRecordId + "')", {
                success: function (data) {
                    MessageToast.show(oResourceBundle.getText("successDelete"));
                },
                error: function (e) {
                    MessageToast.show(oResourceBundle.getText("errorDelete"));
                }
            });
        },

        closeAddDialog: function (oEvent) {
            this.newBookDialog.close();
        },

        closeUpdateDialog: function (oEvent) {
            this.updateBookDialog.close();
        },

        getODataDateFromDatePicker: function (datePickerInstance) {
            const splitDateArray = datePickerInstance.split("-");
            const yyyySlashMMSlashDD = splitDateArray[2] + '-' + splitDateArray[1] + '-' + splitDateArray[0];
            return new Date(yyyySlashMMSlashDD);
        },

        onSearch: function (oEvent) {
            // build filter array
            const aFilter = [];
            const sQuery = oEvent.getParameter("query");
            if (sQuery) {
                aFilter.push(new sap.ui.model.Filter("Title", sap.ui.model.FilterOperator.EQ, sQuery));
            }
            // filter binding
            const oList = this.getView().byId("idBooksTable");
            const oBinding = oList.getBinding("items");
            oBinding.filter(aFilter);
            // const oRecordList = this.getView().byId("idBooksTable");
            // const oItemsBinding = oRecordList.getBinding("items");
            // const sValues = this.getView().byId("searchField").getValue();
            //
            // const NameFilter = new sap.ui.model.Filter("Author", sap.ui.model.FilterOperator.EQ, sValues);
            // const TitleFilter = new sap.ui.model.Filter("Title", sap.ui.model.FilterOperator.EQ, sValues);
            // const oFIlter = new sap.ui.model.Filter([NameFilter, TitleFilter], false);
            // if (sValues.length < 1) {
            //     oItemsBinding.filter();
            // } else {
            //     oItemsBinding.filter(TitleFilter);
            // }
        },

        onSortDescending: function () {
            debugger;
            var sOrder = new sap.ui.model.Sorter("Isbn", true, null);
            this.getView().byId("idBooksTable").getBinding("items").sort(sOrder);
        },

        onSortAscending: function () {
            debugger;
            var sOrder = new sap.ui.model.Sorter("Isbn", false, null);
            this.getView().byId("idBooksTable").getBinding("items").sort(sOrder);
        }

    });
});
