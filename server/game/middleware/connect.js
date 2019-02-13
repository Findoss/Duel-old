const Authentication = require('../../modules/authentication');
const logger = require('./logger');
// const debug = require('../../utils/debug');
// const decorator = require('../../utils/decorators');

module.exports = async (ctx, socket) => {
  const user = await Authentication.JWTStrategy(socket.handshake.query.bearer);

  logger.beforeConnect(ctx, user, socket);

  //
  // const original = socket.emit;
  // socket.emit = ((...args) => {
  //   console.log(';;;');
  //   return original.apply(this, args);
  // });


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

    logger.afterConnect(ctx);

    return true;
  }
  return new Error('no auth');
};
