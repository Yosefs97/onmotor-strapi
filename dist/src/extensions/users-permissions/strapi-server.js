"use strict";
// src/extensions/users-permissions/strapi-server.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (plugin) => {
    plugin.controllers.user.deleteMe = async (ctx) => {
        const authUser = ctx.state.user;
        if (!authUser) {
            return ctx.unauthorized('User not authenticated');
        }
        // לוקחים את השירות רק כשהפונקציה רצה
        const userService = strapi.plugin('users-permissions').service('user');
        const user = await userService.fetch(authUser.id);
        if (!user) {
            return ctx.notFound('User not found');
        }
        await userService.remove({ id: authUser.id });
        ctx.send({ message: 'User deleted successfully' });
    };
    // ✅ שינוי כאן – auth חייב להיות אובייקט
    plugin.routes['content-api'].routes.push({
        method: 'DELETE',
        path: '/users/me',
        handler: 'user.deleteMe',
        config: {
            auth: { scope: ['authenticated'] }, // היה: auth: true
        },
    });
    return plugin;
};
