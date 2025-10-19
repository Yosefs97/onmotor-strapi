export default {
  async getRecent(limit = 10) {
    return await strapi.db.query('api::forum.forum-thread').findMany({
      populate: { category: true },
      orderBy: { date: 'desc' },
      limit
    });
  }
};
