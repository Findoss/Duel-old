const Router = require('koa-router');

// controllers
const ctrlTool = require('../../controllers/tool');
const ctrlSession = require('../../controllers/session');

// routes
const routeStatics = require('./statics');
const routeUsers = require('./users');


const router = new Router();

router
  .use('/static', routeStatics.routes())
  .use('/users', routeUsers.routes())

  .get('/checkNickname', ctrlTool.checkNickname)
  .get('/checkEmail', ctrlTool.checkEmail)

  .post('/signin', ctrlSession.signin)
  .delete('/signout', ctrlSession.verificationToken, ctrlSession.signout)
  .get('/checkToken', ctrlSession.verificationToken, async (ctx, next) => {
    ctx.body = { good: 'good' };
    next();
  })

  .head('/ping', async (ctx, next) => {
    ctx.status = 200;
    next();
  });


module.exports = () => router.routes();
