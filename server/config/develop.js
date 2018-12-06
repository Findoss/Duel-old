module.exports = {
  db: {
    host: 'localhost',
    port: 27017,
    username: '',
    password: '',
    name: 'test_dev_v2',
  },
  email: {
    host: 'smtp.mail.ru',
    port: 465,
    secure: true,
    username: 'aengorg@bk.ru',
    password: '8MGj2wDH29P2jAxc',
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
