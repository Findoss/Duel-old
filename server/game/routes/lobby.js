const ctrlLobby = require('../controllers/lobby');

const Router = require('../../utils/socket_router');

module.exports = ctx => new Router(ctx)
  .on('add', ctrlLobby.add)
  .on('del', ctrlLobby.del)
  .start();
