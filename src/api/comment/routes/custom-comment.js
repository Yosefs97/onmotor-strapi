'use strict';

module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/comments/:id/like',
      handler: 'comment.like',
      config: { auth: false }
    }
  ]
};
