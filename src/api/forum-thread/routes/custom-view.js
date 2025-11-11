export default {
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
};
