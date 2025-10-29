module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: 'cloudinary',
      providerOptions: {
        cloud_name: env('CLOUDINARY_NAME'),
        api_key: env('CLOUDINARY_KEY'),
        api_secret: env('CLOUDINARY_SECRET'),
      },
      actionOptions: {
        upload: {},
        delete: {},
      },
      // ✅ תוספת קריטית להצגת תמונות תקינה בממשק Strapi
      baseUrl: `https://res.cloudinary.com/${env('CLOUDINARY_NAME')}/`,
    },
  },
});
