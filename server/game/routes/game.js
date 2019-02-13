const Router = require('../middleware/socket_router');
const ctrlGame = require('../controllers/game');

module.exports = ctx => new Router(ctx)
  .on('surrender', ctrlGame.surrender)
  .on('fake-action', ctrlGame.fakeAction)
  .on('restore', ctrlGame.restore)
  .start();
