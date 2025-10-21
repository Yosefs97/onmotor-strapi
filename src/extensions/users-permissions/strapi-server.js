const { getService } = require('@strapi/plugin-users-permissions/server/utils');

module.exports = (plugin) => {
  plugin.controllers.user.deleteMe = async (ctx) => {
    const authUser = ctx.state.user;
    if (!authUser) {
      return ctx.unauthorized('User not authenticated');
    }

    const user = await getService('user').fetch(authUser.id);
    if (!user) {
      return ctx.notFound('User not found');
    }

    await getService('user').remove({ id: authUser.id });

    ctx.send({ message: 'User deleted successfully' });
  };

  plugin.routes['content-api'].routes.push({
    method: 'DELETE',
    path: '/users/me',
    handler: 'user.deleteMe',
    config: {
      auth: true,
    },
  });

  return plugin;
};
