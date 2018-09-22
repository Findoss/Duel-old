module.exports = {
  db: {
    host: 'localhost',
    port: 27017,
    username: '',
    password: '',
    name: 'test_dev_v1',
  },
  node: {
    host: 'localhost',
    port: 3001,
  },
  logger: {
    db: true,
    node: true,
    koa: true,
  },
  JWTKey: 'mysecretkey',
};
