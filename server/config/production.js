function toBoolean(variable) {
  return variable !== 'false';
}

module.exports = {
  db: {
    host: process.env.MONGODB_HOST,
    port: process.env.MONGODB_PORT,
    username: process.env.MONGODB_USERNAME,
    password: process.env.MONGODB_PASSWORD,
    name: process.env.MONGODB_DB,
  },
  node: {
    host: process.env.NODE_HOST,
    port: process.env.PORT,
  },
  email: {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: toBoolean(process.env.SMTP_SECURE),
    address: process.env.SMTP_ADDRESS,
    username: process.env.SMTP_USERNAME,
    password: process.env.SMTP_PASSWORD,
  },
  logger: {
    db: toBoolean(process.env.LOGGER_DB),
    node: toBoolean(process.env.LOGGER_NODE),
    koa: toBoolean(process.env.LOGGER_KOA),
    i18n: toBoolean(process.env.LOGGER_I18N),
  },
  JWTKey: process.env.JWT_KEY,
  solt: 'randomSolt',
};
