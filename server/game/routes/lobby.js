/* eslint no-console: 0 */
// правило отключено потому что это важыный элемент логов, необходимо вынести в модуль

const ctrlLobby = require('../controllers/lobby');

module.exports = (ctx) => {
  const { route } = ctx.data;

  console.log(`──‣ ┈┈┈┈┈ SEND ┬ lobby/${route}`); // DEBUG chat
  console.log('               │'); // DEBUG chat

  switch (route) {
    case 'add': return ctrlLobby.add(ctx);
    case 'del': return ctrlLobby.del(ctx);
    case 'count': return ctrlLobby.count(ctx);
    case 'users': return ctrlLobby.users(ctx);

    default:
      break;
  }
  return true;
};
