const Router = require('koa-router');

const avatars = require('../../static/avatars.json');
const userAttributes = require('../../static/user_attributes.json');

const router = new Router();

router
  .get('/avatars', async (ctx) => {
    ctx.body = avatars;
  })

  .get('/user-attributes', async (ctx) => {
    ctx.body = userAttributes;
  });

module.exports = router;
