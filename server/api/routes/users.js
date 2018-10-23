const Router = require('koa-router');

// controllers
const ctrlUser = require('../controllers/user');

const router = new Router();

router
  .get('/', ctrlUser.getUsers)
  .post('/', ctrlUser.userCreate)
  .get('/:id', ctrlUser.getUser);

module.exports = router;
