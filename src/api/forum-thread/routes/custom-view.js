// src/api/forum-thread/routes/forum-thread.js
export default {
  routes: [
    {
      method: 'GET',
      path: '/forum-threads',
      handler: 'forum-thread.find',
      config: {
        auth: false,
      },
    },
    {
      method: 'GET',
      path: '/forum-threads/:id',
      handler: 'forum-thread.findOne',
      config: {
        auth: false,
      },
    },
    {
      method: 'POST',
      path: '/forum-threads',
      handler: 'forum-thread.create',
      config: {
        auth: false,
      },
    },
    {
      method: 'PUT',
      path: '/forum-threads/:id',
      handler: 'forum-thread.update',
      config: {
        auth: false,
      },
    },
    {
      method: 'DELETE',
      path: '/forum-threads/:id',
      handler: 'forum-thread.delete',
      config: {
        auth: false,
      },
    },

    // ✅ הנתיב החדש שלך – כאן בתוך הקובץ הראשי
    {
      method: 'POST',
      path: '/forum-thread/view',
      handler: 'forum-thread.incrementView',
      config: {
        auth: false,
      },
    },
  ],
};
