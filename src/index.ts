// src/index.ts
import type { Core } from '@strapi/strapi';

export default {
  async register({ strapi }: { strapi: Core.Strapi }) {
    // ✅ רישום route ידני לעדכון views
    strapi.server.routes([
      {
        method: 'POST',
        path: '/api/forum-thread/view',
        handler: async (ctx) => {
          try {
            const { slug } = ctx.request.body;

            if (!slug) {
              ctx.status = 400;
              ctx.body = { error: 'Missing slug' };
              return;
            }

            // 🔍 איתור השרשור לפי slug
            const thread = await strapi.db
              .query('api::forum-thread.forum-thread')
              .findOne({ where: { slug } });

            if (!thread) {
              ctx.status = 404;
              ctx.body = { error: 'Thread not found' };
              return;
            }

            const newViews = (thread.views || 0) + 1;

            // 🔁 עדכון views במסד הנתונים
            await strapi.db
              .query('api::forum-thread.forum-thread')
              .update({
                where: { id: thread.id },
                data: { views: newViews },
              });

            ctx.status = 200;
            ctx.body = { success: true, views: newViews };
          } catch (err) {
            strapi.log.error('❌ Error incrementing views:', err);
            ctx.status = 500;
            ctx.body = { error: 'Internal server error' };
          }
        },
        config: {
          auth: false, // פתוח גם למשתמשים לא מחוברים
        },
      },
    ]);
  },

  async bootstrap(/* { strapi }: { strapi: Core.Strapi } */) {},
};
