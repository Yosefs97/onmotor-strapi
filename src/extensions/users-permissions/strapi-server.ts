// C:\Users\yosef\Desktop\onmotor-strapi\src\extensions\users-permissions\strapi-server.ts

export default (plugin: any) => {
  const userService = strapi.plugin('users-permissions').service('user');

  plugin.controllers.user.deleteMe = async (ctx: any) => {
    const authUser = ctx.state.user;
    if (!authUser) {
      return ctx.unauthorized('User not authenticated');
    }

    const user = await userService.fetch(authUser.id);
    if (!user) {
      return ctx.notFound('User not found');
    }

    await userService.remove({ id: authUser.id });

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
