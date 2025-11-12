// /src/api/forum-thread/content-types/forum-thread/lifecycles.ts

const makeBaseSlug = (title = '') =>
  title
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')                         // רווחים ל־מקפים
    .replace(/[^\u0590-\u05FFa-z0-9-]/g, '');     // מסיר תווים לא רלוונטיים (משאיר עברית/לטינית/ספרות/מקף)

/**
 * מוצא slug ייחודי: אם תפוס — מוסיף ‎-2, ‎-3, ...
 */
async function findUniqueSlug(slug, uid) {
  const existing = await strapi.db.query(uid).findOne({ where: { slug } });
  if (!existing) return slug;

  let i = 2;
  while (true) {
    const candidate = `${slug}-${i}`;
    // בדיקה מחדש
    const dup = await strapi.db.query(uid).findOne({ where: { slug: candidate } });
    if (!dup) return candidate;
    i++;
  }
}

module.exports = {
  async beforeCreate(event) {
    const { data } = event.params;
    const uid = 'api::forum-thread.forum-thread';

    // אם לא נשלח slug — יוצרים מבוסס title
    if (!data.slug && data.title) {
      const base = makeBaseSlug(data.title);
      data.slug = await findUniqueSlug(base, uid);
      strapi.log.info(`[forum-thread] slug נוצר: ${data.slug}`);
    }

    // אם נשלח slug (מה-Frontend) — מוודאים ייחודיות
    if (data.slug) {
      // חשוב: ה-Frontend שלח slug מקודד? נפענח ל-DB
      try {
        data.slug = decodeURIComponent(data.slug);
      } catch (_) {}
      data.slug = await findUniqueSlug(data.slug, uid);
    }
  },

  async beforeUpdate(event) {
    const { data, where } = event.params;
    const uid = 'api::forum-thread.forum-thread';

    // אם מעדכנים כותרת ואין slug, או מעדכנים slug — נטפל
    if ((!data.slug && data.title) || data.slug) {
      let base = data.slug ? data.slug : makeBaseSlug(data.title);
      try {
        base = decodeURIComponent(base);
      } catch (_) {}
      // להבטיח ייחודיות, מבלי להתנגש עם הרשומה הנוכחית
      const existing = await strapi.db.query(uid).findOne({ where: { id: where?.id } });
      const candidate = await findUniqueSlug(base, uid);

      // אם ה-candidate שייך לרשומה אחרת — נעדכן
      if (!existing || existing.slug !== candidate) {
        data.slug = candidate;
        strapi.log.info(`[forum-thread] slug עודכן: ${data.slug}`);
      }
    }
  },
};
