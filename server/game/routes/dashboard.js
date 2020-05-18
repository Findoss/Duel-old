const Router = require('../middleware/socket_router');
const ctrlDashboard = require('../controllers/dashboard');

module.exports = ctx => new Router(ctx)
  .on('lobby-users', ctrlDashboard.usersLobby)
  .on('lobby-count', ctrlDashboard.usersLobbyCount)
  .on('game-count', ctrlDashboard.gamesCount)
  .on('world-users-count', ctrlDashboard.usersCount)
  .on('world-users', ctrlDashboard.users)
  .start();
