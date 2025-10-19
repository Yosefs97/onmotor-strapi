export default {
  async find(ctx) {
    const data = await strapi.db.query('api::forum.forum-category').findMany({
      populate: { threads: true },
      orderBy: { name: 'asc' },
    });
    ctx.body = data;
  },

  async findOne(ctx) {
    const { id } = ctx.params;
    const data = await strapi.db.query('api::forum.forum-category').findOne({
      where: { id },
      populate: { threads: true },
    });
    ctx.body = data;
  }
};
