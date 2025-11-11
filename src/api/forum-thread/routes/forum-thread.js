// src/api/forum-thread/routes/forum-thread.js
/**
 * forum-thread router
 */
import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::forum-thread.forum-thread', {
  config: {
    find: { auth: false },
    findOne: { auth: false },
  },
  routes: [
    {
      method: 'POST',
      path: '/forum-thread/view',
      handler: 'forum-thread.incrementView',
      config: {
        auth: false,
      },
    },
  ],
});
