// strapi\config\plugins.ts
export default () => ({
  'users-permissions': {
    config: {
      jwt: {
        expiresIn: '7d',
      },
    },
  },
  // **הוסף את הבלוק הזה עבור ה-Content-Type Builder:**
  'content-type-builder': {
    enabled: true,
  },
});