sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/StandardListItem"
], function (Controller, JSONModel, Filter, FilterOperator, StandardListItem) {
    "use strict";

    return Controller.extend("intellibaseui.controller.MainView", {

        onInit: function () {
            this._oODataModel = this.getOwnerComponent().getModel(); // default OData V4 model
            // JSONModels for dropdowns
            this._oCategoryModel = new JSONModel();
            this._oProductModel = new JSONModel();
            this.getView().setModel(this._oCategoryModel, "categoriesModel");
            this.getView().setModel(this._oProductModel, "productsModel");

            // Get controls
            this._oCategorySelect = this.byId("categorySelect");
            this._oProductSelect = this.byId("productSelect");
            this._oPromptList = this.byId("promptList");

            // Load dropdowns and list
            this.loadCategories();
            this.loadProducts(); // initially load all products
            this.loadPrompts();
        },

        // Load distinct categories
        loadCategories: async function () {
            const oBinding = this._oODataModel.bindContext("/DistinctCategories(...)");

            await oBinding.execute();
            const result = oBinding.getBoundContext().getObject();

            const oJSONModel = new JSONModel(result.value);
            this.getView().setModel(oJSONModel, "categories");
        },

        // Load distinct products optionally filtered by category
        loadProducts: async function (category) {
            const oBinding = this._oODataModel.bindContext("/DistinctProducts(...)");

            await oBinding.execute();
            const result = oBinding.getBoundContext().getObject();

            const oJSONModel = new JSONModel(result.value);
            this.getView().setModel(oJSONModel, "products");
        },

        // Load prompts list filtered by category/product
        loadPrompts: function (category, product) {
            const aFilters = [];
            if (category) aFilters.push(new Filter("category", FilterOperator.EQ, category));
            if (product) aFilters.push(new Filter("product", FilterOperator.EQ, product));

            const oBinding = this._oPromptList.getBinding("items");
            if (oBinding) {
                oBinding.filter(aFilters);
            } else {
                this._oPromptList.bindItems({
                    path: "/PromptsData",
                    template: new StandardListItem({
                        title: "{prompt}",
                        description: "{description}"
                    }),
                    filters: aFilters
                });
            }
        },

        // Event handler for category dropdown
        onCategoryChange: function (oEvent) {
            const selectedCategory = oEvent.getParameter("selectedItem")?.getKey();

            // Reload products filtered by category
            // this.loadProducts(selectedCategory);

            // Reload prompts list filtered by category + current product
            const selectedProduct = this._oProductSelect.getSelectedKey();
            this.loadPrompts(selectedCategory, selectedProduct);
        },

        // Event handler for product dropdown
        onProductChange: function (oEvent) {
            const selectedProduct = oEvent.getParameter("selectedItem")?.getKey();
            const selectedCategory = this._oCategorySelect.getSelectedKey();

            // Reload prompts list filtered by category + product
            this.loadPrompts(selectedCategory, selectedProduct);
        },
        onSelectPrompt : function(oEvent){
            var oSelectedPrompt = oEvent.getParameter("listItem").getTitle();
            // this.getV(iew().getModel().setProperty("/selectedPrompt",oSelectedPrompt);
            this.getView().byId("selectedPrompt").setValue(oSelectedPrompt);
        }
    });
});