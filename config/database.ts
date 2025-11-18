// /config/database.ts
export default ({ env }) => {
  const databaseUrl = env('DATABASE_URL');

  // 1. תצורת Production (Postgres) - אם DATABASE_URL קיים
  if (databaseUrl) {
    return {
      connection: {
        client: env('DATABASE_CLIENT', 'postgres'),
        connection: {
          connectionString: databaseUrl,
          // אם אתה על Render, רוב הסיכויים שאתה צריך ssl, לכן משאירים את זה
          ssl: { rejectUnauthorized: false }, 
        },
        debug: false,
      },
    };
  }

  // 2. תצורת ברירת מחדל (SQLite)
  // חובה להחזיר אובייקט כלשהו כדי למנוע את השגיאה 'undefined'
  return {
    connection: {
      client: 'sqlite',
      connection: {
        filename: env('DATABASE_FILENAME', '.tmp/data.db'),
      },
      useNullAsDefault: true,
      debug: false,
    },
  };
};