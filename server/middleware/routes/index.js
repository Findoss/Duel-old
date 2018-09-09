const Router = require('koa-router');

// routes
const routeStatics = require('./statics');
const routeUsers = require('./users');
const routeTools = require('./tools');
const routeAuth = require('./auth');
const routeSkill = require('./skills');


const router = new Router();

router
  .use('/static', routeStatics.routes())
  .use('/skills', routeSkill.routes())
  .use('/users', routeUsers.routes())
  .use('/tools', routeTools.routes())
  .use('/auth', routeAuth.routes());

module.exports = () => router.routes();
