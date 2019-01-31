const ctrlGame = require('../controllers/game');

const Router = require('../../utils/socket_router');

module.exports = ctx => new Router(ctx)
  .on('surrender', ctrlGame.surrender)
  .start();
