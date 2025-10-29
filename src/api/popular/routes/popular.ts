// src/api/popular/routes/popular.ts
export default {
  routes: [
    {
      method: 'PUT',
      path: '/populars/:id/increment-view',
      handler: 'popular.incrementView',
      config: {
        auth:{ scope: ['public'] },
      },
    },
  ],
};
