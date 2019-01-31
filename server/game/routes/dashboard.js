const ctrlLobby = require('../controllers/lobby');
const ctrlGame = require('../controllers/game');
const ctrlDashboard = require('../controllers/dashboard');

const Router = require('../../utils/socket_router');

module.exports = ctx => new Router(ctx)
  .on('lobby-users', ctrlLobby.users)
  .on('lobby-count', ctrlLobby.count)
  .on('game-count', ctrlGame.count)
  .on('world-users-count', ctrlDashboard.usersCount)
  .on('world-users', ctrlDashboard.users)
  .start();
