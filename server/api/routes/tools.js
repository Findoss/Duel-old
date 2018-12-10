const Router = require('koa-router');

// controllers
const ctrlTool = require('../controllers/tool');
const ctrlSession = require('../controllers/session');

const router = new Router();

router
  .get('/checkEmail', ctrlTool.checkEmail)
  .get('/checkNickname', ctrlTool.checkNickname)
  .get('/checkPasswordResetLink', ctrlTool.checkPasswordResetLink)
  .get('/checkToken', ctrlSession.tokenVerification, async (ctx, next) => {
    ctx.body = { isAuthenticated: ctx.isAuthenticated() };
    next();
  })
  .head('/ping', async (ctx, next) => {
    ctx.status = 200;
    next();
  });

module.exports = router;
