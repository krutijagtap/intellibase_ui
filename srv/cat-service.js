const cds = require('@sap/cds');
const { SELECT } = require('@sap/cds/lib/ql/cds-ql');

module.exports = cds.service.impl(async function () {
    const { PromptsData } = this.entities;
    // Return distinct categories
    this.on('DistinctCategories', async (req) => {
        const result = await SELECT.distinct
        .from(PromptsData)
        .columns("category");
        return result;
    });

    // Return distinct products (optionally filtered by category)
    this.on('DistinctProducts', async (req) => {
         const result = await SELECT.distinct
        .from(PromptsData)
        .columns("product");
        return result;
    });

});
