/* eslint no-param-reassign: "error" */
/* правило отключено для изменения стейта, что бы задавать userId например */

/* eslint no-console: 0 */
// правило отключено потому что это важыный элемент логов, необходимо вынести в модуль

const config = require('../../config');

const Authentication = require('../../modules/authentication');

module.exports = async (ctx, socket, next) => {
  const user = await Authentication.JWTStrategy(socket.handshake.query.bearer);
  if (user) {
    ctx.store.players[user.id] = {
      access: user.access,
      gameId: user.gameId,
      socket,
    };
    ctx.userId = user.id;
    ctx.data = {};

    if (config.logger.game) {
      console.log(`──‣ ┈┈┈┈┈ AUTH ┬ ${user.id || 'NOT AUTH'}`);
      console.log(`               │ io #${socket.id}`);
      console.log(`${!user.id ? '┈┈┈┈┈┈┈┈┈┈┈┈┈┈ ┴' : '               │'}`);
    }

    return next();
  }
  return new Error('no auth');
};
