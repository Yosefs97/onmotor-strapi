export default {
  routes: [
    {
      method: 'GET',
      path: '/forum/categories',
      handler: 'forum-category.find',
      config: { auth: false },
    },
    {
      method: 'GET',
      path: '/forum/categories/:id',
      handler: 'forum-category.findOne',
      config: { auth: false },
    },
    {
      method: 'POST',
      path: '/forum/categories',
      handler: 'forum-category.create',
      config: { auth: false },
    },
  ],
};
