export default {
  routes: [
    { method: 'GET', path: '/forum/categories', handler: 'forum-category.find' },
    { method: 'GET', path: '/forum/categories/:id', handler: 'forum-category.findOne' }
  ]
};
