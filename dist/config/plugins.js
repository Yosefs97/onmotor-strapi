// config/plugins.ts
module.exports = ({ env }) => ({
    upload: {
        config: {
            provider: '@strapi/provider-upload-cloudinary',
            providerOptions: {
                cloud_name: env('CLOUDINARY_NAME'),
                api_key: env('CLOUDINARY_KEY'),
                api_secret: env('CLOUDINARY_SECRET'),
            },
            actionOptions: {
                upload: {},
                delete: {},
            },
            // תוספת ויזואלית בלבד, לא חובה – אבל עוזרת אם יש מדיה חיצונית
            baseUrl: `https://res.cloudinary.com/${env('CLOUDINARY_NAME')}/`,
            breakpoints: {
                large: 1000,
                medium: 750,
                small: 500,
                thumbnail: 150,
            },
        },
    },
});
