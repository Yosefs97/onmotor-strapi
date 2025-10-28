module.exports = ({ env }) => ({
  url: env('PUBLIC_URL'),
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS', [
      'EDUziIvM7y8Lm0qvu7Fl/w==',
      'EedR0+7HvrjJFMwse//KpA==',
      '+NUlITo6vvqLXHMOKzG6aQ==',
      'kmS7Fnis9egocHnlcumbbw==',
    ]),
  },
});
