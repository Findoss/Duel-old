/* eslint no-param-reassign: "error" */
/* правило отключено для изменения стейта, что бы задавать userId например */

const debug = require('../../utils/debug');
const Authentication = require('../../modules/authentication');

module.exports = async (ctx, socket) => {
  const user = await Authentication.JWTStrategy(socket.handshake.query.bearer);
  if (user) {
    ctx.store.users[user.id] = {
      access: user.access,
      gameId: user.gameId,
      socket,
    };
    if (user.gameId) {
      ctx.store.users[user.id].socket.join(user.gameId);
    }
    ctx.userId = user.id;
    ctx.data = {};

    debug.log(`──‣ ┈┈┈┈┈ AUTH ┬ ${user.id || 'NOT AUTH'}`);
    debug.log(`               │ io #${socket.id}`);
    debug.log(`${!user.id ? '┈┈┈┈┈┈┈┈┈┈┈┈┈┈ ┴' : '               │'}`);

    return true;
  }
  return new Error('no auth');
};
