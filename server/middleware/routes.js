const Router = require('koa-router');

// controllers
const ctrlUser = require('../controllers/user');

function getAll() {
  return new Promise((resolve, reject) => {
    resolve({ hello: 'world' });
  });
}
const router = new Router();


router
  .get('/users', ctrlUser.getUsers)
  .get('/users/:id', ctrlUser.getUser)
  .post('/users', ctrlUser.userCreate)
  });

module.exports = () => router.routes();
