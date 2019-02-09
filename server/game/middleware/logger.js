const debug = require('../../utils/debug');

module.exports = async (ctx) => {
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
