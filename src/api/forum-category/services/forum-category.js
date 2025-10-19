export default {
  async getAll() {
    return await strapi.db.query('api::forum.forum-category').findMany({
      populate: { threads: true }
    });
  }
};
