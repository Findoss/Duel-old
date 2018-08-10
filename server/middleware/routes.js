const Router = require('koa-router');

// controllers
const ctrlUser = require('../controllers/user');
const ctrlTool = require('../controllers/tool');

function getAll() {
  return new Promise((resolve, reject) => {
    resolve({ hello: 'world' });
  });
}
// static
const avatars = require('../static/avatars.json');
const userParameters = require('../static/user_parameters.json');

const router = new Router();


router
  .get('/users', ctrlUser.getUsers)
  .get('/users/:id', ctrlUser.getUser)
  .post('/users', ctrlUser.userCreate)
  .head('/ping', async (ctx, next) => {
    ctx.status = 200;
    next();
  })

  .get('/static/avatars', async (ctx, next) => {
    ctx.body = avatars;
    next();
  })

  .get('/static/user-parameters', async (ctx, next) => {
    ctx.body = userParameters;
    next();
  });

module.exports = () => router.routes();
