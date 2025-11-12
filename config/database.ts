// /config/database.ts
export default ({ env }) => {
  const databaseUrl = env('DATABASE_URL');

  if (databaseUrl) {
    return {
      connection: {
        client: env('DATABASE_CLIENT', 'postgres'),
        connection: {
          connectionString: databaseUrl,
          ssl: { rejectUnauthorized: false },
        },
        debug: false,
      },
    };
  }

  // ✅ fallback למצב פיתוח (למנוע שגיאה אם DATABASE_URL חסר)
  return {
    connection: {
      client: 'sqlite',
      connection: {
        filename: env('DATABASE_FILENAME', '.tmp/data.db'),
      },
      useNullAsDefault: true,
    },
  };
};
