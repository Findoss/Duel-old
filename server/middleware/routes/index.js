const Router = require('koa-router');

const ctrlSession = require('../../controllers/session');

// routes
const routeMe = require('./me');
const routeAuth = require('./auth');
const routeUsers = require('./users');
const routeTools = require('./tools');
const routeSkill = require('./skills');
const routeStatics = require('./statics');

const router = new Router();

module.exports = router
  .prefix('/api')
  .use('/auth', routeAuth.routes())
  .use('/users', routeUsers.routes())
  .use('/tools', routeTools.routes())
  .use('/skills', routeSkill.routes())
  .use('/static', routeStatics.routes())
  .use('/me', ctrlSession.tokenVerification, routeMe.routes());
