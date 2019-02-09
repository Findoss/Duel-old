const Router = require('../../utils/socket_router');
const ctrlGame = require('../controllers/game');

module.exports = ctx => new Router(ctx)
  .on('surrender', ctrlGame.surrender)
  .on('restore', ctrlGame.restore)
  .start();
