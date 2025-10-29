// src/api/popular/controllers/popular.ts
import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::popular.popular', ({ strapi }) => ({
  // פונקציה חדשה שמגדילה את מונה הצפיות
  async incrementView(ctx) {
    const { id } = ctx.params;

    const entity = await strapi.db.query('api::popular.popular').findOne({ where: { id } });
    if (!entity) return ctx.notFound('Popular item not found');

    const updated = await strapi.db.query('api::popular.popular').update({
      where: { id },
      data: { views: (entity.views || 0) + 1 },
    });

    return ctx.send({ views: updated.views });
  },
}));
