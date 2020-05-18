const Router = require('../middleware/socket_router');
const ctrlLobby = require('../controllers/lobby');

module.exports = ctx => new Router(ctx)
  .on('add', ctrlLobby.add)
  .on('del', ctrlLobby.del)
  .start();
