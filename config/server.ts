// strapi/config/server.ts
export default ({ env }) => ({
  url: env('PUBLIC_URL', 'https://www.onmotormedia.com'),
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
});
