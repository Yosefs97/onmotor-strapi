export default {
  async find(ctx) {
    const threads = await strapi.db.query('api::forum.forum-thread').findMany({
      populate: { category: true, comments: true },
      orderBy: { date: 'desc' }
    });
    ctx.body = threads;
  },

  async findOne(ctx) {
    const { id } = ctx.params;
    const thread = await strapi.db.query('api::forum.forum-thread').findOne({
      where: { id },
      populate: { category: true, comments: true }
    });
    ctx.body = thread;
  },

  async create(ctx) {
    const data = ctx.request.body.data || ctx.request.body;
    const thread = await strapi.db.query('api::forum.forum-thread').create({ data });
    ctx.body = thread;
  }
};
