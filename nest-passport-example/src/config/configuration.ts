export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  cookieSecret: process.env.COOKIE_SECRET,
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
  },
  typeorm: {
    host: process.env.TYPEORM_HOST,
    port: +process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    synchronize: JSON.parse(process.env.TYPEORM_SYNCHRONIZE),
    logging: JSON.parse(process.env.TYPEORM_LOGGING),
  },
});
