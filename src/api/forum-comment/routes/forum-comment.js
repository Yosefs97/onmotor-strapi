export default {
  routes: [
    {
      method: 'GET',
      path: '/forum/comments',
      handler: 'forum-comment.find',
      config: { auth: false }
    },
    {
      method: 'GET',
      path: '/forum/comments/:id',
      handler: 'forum-comment.findOne',
      config: { auth: false }
    },
    {
      method: 'POST',
      path: '/forum/comments',
      handler: 'forum-comment.create',
      config: { auth: false }
    }
  ]
};
