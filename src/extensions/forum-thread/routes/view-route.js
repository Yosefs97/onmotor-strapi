// src/extensions/forum-thread/routes/view-route.js
export default [
  {
    method: 'POST',
    path: '/forum-thread/view',
    handler: 'api::forum-thread.forum-thread.incrementView',
    config: {
      auth: false,
    },
  },
];
