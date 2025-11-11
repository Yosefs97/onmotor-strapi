// src/api/forum-thread/controllers/forum-thread.js
import { factories } from '@strapi/strapi';

export default factories.createCoreController(
  'api::forum-thread.forum-thread',
  ({ strapi }) => ({
    /**
     * 📈 incrementView – מעלה את מספר הצפיות ב־1 לפי slug
     * נתיב: POST /api/forum-thread/view
     * body: { "slug": "thread-123..." }
     */
    async incrementView(ctx) {
      try {
        const { slug } = ctx.request.body;

        if (!slug) {
          return ctx.badRequest('Missing slug');
        }

        // 🔍 מחפש את השרשור לפי slug
        const thread = await strapi.db
          .query('api::forum-thread.forum-thread')
          .findOne({
            where: { slug },
            select: ['id', 'views'],
          });

        if (!thread) {
          return ctx.notFound('Thread not found');
        }

        const newViews = (thread.views || 0) + 1;

        // 🔁 עדכון הצפיות ב־DB
        const updated = await strapi.db
          .query('api::forum-thread.forum-thread')
          .update({
            where: { id: thread.id },
            data: { views: newViews },
          });

        ctx.body = {
          success: true,
          views: updated?.views ?? newViews,
        };
      } catch (err) {
        strapi.log.error('❌ incrementView error:', err);
        return ctx.internalServerError('Error updating views');
      }
    },
  })
);
