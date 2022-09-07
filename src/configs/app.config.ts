import 'dotenv/config';

export const config = {
  app: {
    name: process.env.APP_NAME || 'csv-parser',
    port: process.env.PORT || 3000,
    environment: process.env.ENVIRONMENT || 'local',
  },
  mysql: {
    host: process.env.MYSQL_HOST || 'localhost',
    port: Number(process.env.MYSQL_PORT) || 3306,
    user: process.env.MYSQL_USER || 'admin',
    password: process.env.MYSQL_PASSWORD || 'admin',
    dbName: process.env.MYSQL_DATABASE || 'csv-report',
    debug: true,
  },
} as const;
