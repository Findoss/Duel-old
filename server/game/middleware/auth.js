/* eslint no-param-reassign: "error" */
/* правило отключено для изменения стейта, что бы задавать userId например */

/* eslint no-console: 0 */
// правило отключено потому что это важыный элемент логов, необходимо вынести в модуль


const { checkSocketToken } = require('../../api/controllers/token');

module.exports = async (socket, next) => {
  const userId = await checkSocketToken(socket.handshake.query.bearer);

  // DEBUG chat
  console.log(`──‣ ┈┈┈┈┈ AUTH ┬ ${userId || 'NOT AUTH'}`);
  console.log(`               │ io #${socket.id}`);
  console.log(`${!userId ? '┈┈┈┈┈┈┈┈┈┈┈┈┈┈ ┴' : '               │'}`);
  // DEBUG chat-end

  if (userId) {
    socket.userId = userId;
    return next();
  }
  return new Error('no auth');
};
