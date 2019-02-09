const ctrlLobby = require('../controllers/lobby');

module.exports = async (ctx) => {
  const { store, userId } = ctx;
  const { socket } = store.users[userId];

  socket.on('disconnect', () => Promise.all([
    ctrlLobby.del(ctx),
  ]).then(() => {
    delete ctx.store.users[ctx.userId];
  }));
};
