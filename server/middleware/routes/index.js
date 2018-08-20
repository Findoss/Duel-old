const Router = require('koa-router');

// controllers
const ctrlSession = require('../../controllers/session');

// routes
const routeStatics = require('./statics');
const routeUsers = require('./users');
const routeTools = require('./tools');


const router = new Router();

router
  .use('/static', routeStatics.routes())
  .use('/users', routeUsers.routes())
  .use('/tools', routeTools.routes())

  .post('/signin', ctrlSession.signin)
  .delete('/signout', ctrlSession.verificationToken, ctrlSession.signout);


module.exports = () => router.routes();
