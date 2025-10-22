export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: env('STRAPI_API_URL', 'https://onmotor-strapi.onrender.com'),
  app: {
    keys: env.array('APP_KEYS'),
  },
  admin: {
    url: '/admin', // שומר את הניהול רק כאן, לא מוסיף ל-url הראשי
    serveAdminPanel: true,
    auth: {
      secret: env('ADMIN_JWT_SECRET'),
    },
  },
});
