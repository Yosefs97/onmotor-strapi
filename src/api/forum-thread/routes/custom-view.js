module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/forum-thread/view',
      handler: 'forum-thread.incrementView',
      config: {
        auth: false, // ✅ נגיש גם למשתמשים אנונימיים
      },
    },
  ],
};
