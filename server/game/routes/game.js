/* eslint no-console: 0 */
// правило отключено потому что это важыный элемент логов, необходимо вынести в модуль

const ctrlGame = require('../controllers/game');

module.exports = async (ctx) => {
  const { route } = ctx.data;

  console.log(`──‣ ┈┈┈┈┈ SEND ┬ game/${route}`); // DEBUG chat
  console.log('               │'); // DEBUG chat

  switch (route) {
    case 'surrender': return ctrlGame.surrender(ctx);

    default:
      break;
  }
  return true;
};
