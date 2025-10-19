export default {
  routes: [
    { method: 'GET', path: '/forum/comments', handler: 'forum-comment.find' },
    { method: 'POST', path: '/forum/comments', handler: 'forum-comment.create' }
  ]
};
