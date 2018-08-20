const Router = require('koa-router');

// static
const avatars = require('../../static/avatars.json');
const userParameters = require('../../static/user_parameters.json');

const router = new Router();

router
  .get('/avatars', async (ctx) => {
    ctx.body = avatars;
  })

  .get('/user-parameters', async (ctx) => {
    ctx.body = userParameters;
  });

module.exports = router;
