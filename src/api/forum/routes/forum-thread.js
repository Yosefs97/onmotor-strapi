export default {
  routes: [
    { method: 'GET', path: '/forum/threads', handler: 'forum-thread.find' },
    { method: 'GET', path: '/forum/threads/:id', handler: 'forum-thread.findOne' },
    { method: 'POST', path: '/forum/threads', handler: 'forum-thread.create' }
  ]
};
