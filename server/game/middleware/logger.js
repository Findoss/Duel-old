const debug = require('../../utils/debug');

module.exports.beforeConnect = async (ctx, user, socket) => {
  debug.log(`──‣ ┈┈┈┈┈ AUTH ┬ ${user.id || 'NOT AUTH'}`);
  debug.log(`               │ io #${socket.id}`);
  debug.log(`${!user.id ? '┈┈┈┈┈┈┈┈┈┈┈┈┈┈ ┴' : '               │'}`);
};

module.exports.afterConnect = async (ctx) => {
  const { store, userId } = ctx;
  const { socket } = store.users[userId];

  debug.log('               │ CONNECT');
  debug.log('┈┈┈┈┈┈┈┈┈┈┈┈┈┈ ┴');

  socket.on('disconnect', () => {
    debug.log('               ⁞');
    debug.log(`──‣ DISCONNECT ┬ ${userId || 'NOT AUTH'}`);
    debug.log(`               │ io #${socket.id}`);
    debug.log('┈┈┈┈┈┈┈┈┈┈┈┈┈┈ ┴ ');
  });
};

module.exports.beforeRoute = async (ctx, path, data) => {
  const { socket } = ctx.store.users[ctx.userId];
  debug.log(`──‣ ┈┈┈┈┈ SEND ┬ /${path}/${data.route}`);
  debug.log(`               │ id: ${ctx.userId || ''}`);
  debug.log(`               │ io: ${socket.id || ''}`);
  debug.log('               │ {');
  debug.log(data.gameId ? `               │   ${data.gameId}` : '');
  debug.log(data.payload ? `               │   ${data.payload}` : '');
  debug.log('               │ }');
  debug.log('               │');
};

module.exports.errorRoute = (error) => {
  debug.log(`               │ ${error}`);
};

module.exports.sendData = (data) => {
  const string = JSON.stringify(data, null, 2).replace(/\n/g, '\n               │ ');
  debug.log(`               │ ${string || ''}`);
  debug.log('┈┈┈┈┈┈┈┈┈┈┈┈┈┈ ┴');
};
