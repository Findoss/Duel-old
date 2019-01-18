
const ctrlLobby = require('../controllers/lobby');
const ctrlGame = require('../controllers/game');

module.exports = (ctx) => {
  const { route } = ctx.data;

  console.log(`──‣ ┈┈┈┈┈ SEND ┬ dashboard/${route}`); // DEBUG chat
  console.log('               │'); // DEBUG chat

  switch (route) {
    case 'lobby-users': return ctrlLobby.users(ctx);
    case 'lobby-count': return ctrlLobby.count(ctx);
    case 'game-count': return ctrlGame.count(ctx);

    default:
      break;
  }
  return true;
};
