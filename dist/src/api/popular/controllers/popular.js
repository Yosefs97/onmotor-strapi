"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/api/popular/controllers/popular.ts
const strapi_1 = require("@strapi/strapi");
exports.default = strapi_1.factories.createCoreController('api::popular.popular', ({ strapi }) => ({
    // ✅ פעולה מותאמת אישית להגדלת views
    async incrementView(ctx) {
        try {
            const { id } = ctx.params;
            if (!id)
                return ctx.badRequest('Missing ID');
            const existing = await strapi.db.query('api::popular.popular').findOne({ where: { id } });
            if (!existing)
                return ctx.notFound('Popular item not found');
            const updated = await strapi.db.query('api::popular.popular').update({
                where: { id },
                data: { views: (existing.views || 0) + 1 },
            });
            return ctx.send({ views: updated.views });
        }
        catch (err) {
            strapi.log.error('Error in incrementView:', err);
            return ctx.internalServerError('Something went wrong');
        }
    },
}));
