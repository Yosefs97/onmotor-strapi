// src/api/comment/controllers/comment.js
'use strict';
const { createCoreController } = require('@strapi/strapi').factories;
module.exports = createCoreController('api::comment.comment', ({ strapi }) => ({
    // יצירת תגובה עם שיוך למשתמש מחובר
    async create(ctx) {
        const user = ctx.state.user;
        if (!user)
            return ctx.unauthorized('You must be logged in to comment');
        ctx.request.body.data.author = user.id;
        return await super.create(ctx);
    },
    // עדכון תגובה – רק המחבר יכול
    async update(ctx) {
        const user = ctx.state.user;
        const { id } = ctx.params;
        const comment = await strapi.db.query('api::comment.comment').findOne({
            where: { id },
            populate: ['author']
        });
        if (!comment)
            return ctx.notFound('Comment not found');
        if (comment.author.id !== user.id)
            return ctx.forbidden('Not allowed');
        return await super.update(ctx);
    },
    // מחיקת תגובה – רק המחבר יכול
    async delete(ctx) {
        const user = ctx.state.user;
        const { id } = ctx.params;
        const comment = await strapi.db.query('api::comment.comment').findOne({
            where: { id },
            populate: ['author']
        });
        if (!comment)
            return ctx.notFound('Comment not found');
        if (comment.author.id !== user.id)
            return ctx.forbidden('Not allowed');
        return await super.delete(ctx);
    },
    // לייק
    async like(ctx) {
        const { id } = ctx.params;
        const comment = await strapi.db.query('api::comment.comment').findOne({ where: { id } });
        if (!comment)
            return ctx.notFound('Comment not found');
        const updated = await strapi.db.query('api::comment.comment').update({
            where: { id },
            data: { likes: (comment.likes || 0) + 1 }
        });
        return updated;
    }
}));
