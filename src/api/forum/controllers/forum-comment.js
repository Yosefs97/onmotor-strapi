export default {
  async find(ctx) {
    const comments = await strapi.db.query('api::forum.forum-comment').findMany({
      populate: { thread: true },
      orderBy: { date: 'asc' }
    });
    ctx.body = comments;
  },

  async create(ctx) {
    const data = ctx.request.body.data || ctx.request.body;
    const comment = await strapi.db.query('api::forum.forum-comment').create({ data });
    ctx.body = comment;
  }
};
