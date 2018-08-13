const Router = require('koa-router');

// controllers
const ctrlUser = require('../controllers/user');
const ctrlTool = require('../controllers/tool');

// static
const avatars = require('../static/avatars.json');
const userParameters = require('../static/user_parameters.json');

const router = new Router();


router
  .get('/users', ctrlUser.getUsers)
  .get('/users/:id', ctrlUser.getUser)
  .post('/users', ctrlUser.userCreate)


  .get('/checkNickname', ctrlTool.checkNickname)
  .get('/checkEmail', ctrlTool.checkEmail)


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
