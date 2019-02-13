const Router = require('../middleware/socket_router');
const debug = require('../../utils/debug');

const Authorization = require('../../modules/authorization');

const routeLobby = require('./lobby');
const routeGame = require('./game');
const routeDashboard = require('./dashboard');

const ctrlGame = require('../controllers/game');

module.exports = (ctx) => {
  const router = new Router(ctx);

  router.use('dashboard', Authorization.checkAccess(1), routeDashboard);
  router.use('game', ctrlGame.check, routeGame);
  router.use('lobby', routeLobby);

  router.use('chat', () => {
    const { data } = ctx;
    ctx.store.io.emit('Chat', { user: ctx.userId, message: data.payload });
    debug.log('──‣ ┈┈┈┈┈ SEND ┬ chat');
    debug.log('               │');
    debug.log(`               │ ${data.payload}`);
    debug.log('               │');
    debug.log(`┈┈┈┈┈┈┈┈┈┈┈┈┈┈ ┴ ${data.payload}`);
  });
};
