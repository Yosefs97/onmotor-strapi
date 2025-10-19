export default {
  async getByThread(threadId) {
    return await strapi.db.query('api::forum.forum-comment').findMany({
      where: { thread: threadId },
      orderBy: { date: 'asc' }
    });
  }
};
