module.exports = [
  'strapi::errors',
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      origin: [
        'http://localhost:3000',
        'https://onmotor-frontend.vercel.app',
        'https://onmotor-frontend-f59b-rhq47hbv7-yosefs-projects-8bc687be.vercel.app',
        'https://onmotormedia.com',
        'https://www.onmotormedia.com'
      ],
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'], // ✅ הוספתי PATCH
      headers: [
        'Content-Type',
        'Authorization',
        'Origin',
        'Accept',
        'Access-Control-Allow-Origin'
      ],
      credentials: true, // ✅ מאפשר שליחת cookies / headers מאובטחים
      keepHeaderOnError: true,
    },
  },
  'strapi::security',
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
