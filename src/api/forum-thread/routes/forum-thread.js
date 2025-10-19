export default {
  routes: [
    {
      method: 'GET',
      path: '/forum/threads',
      handler: 'forum-thread.find',
      config: { auth: false }
    },
    {
      method: 'GET',
      path: '/forum/threads/:id',
      handler: 'forum-thread.findOne',
      config: { auth: false }
    },
    {
      method: 'POST',
      path: '/forum/threads',
      handler: 'forum-thread.create',
      config: { auth: false }
    }
  ]
};
