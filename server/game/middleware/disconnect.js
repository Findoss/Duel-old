const ctrlLobby = require('../controllers/lobby');

module.exports = async (ctx) => {
  const { store, userId } = ctx;
  const { socket } = store.players[userId];

  socket.on('disconnect', () => Promise.all([
    ctrlLobby.del(ctx),
  ]).then(() => {
    delete ctx.store.players[ctx.userId];
  }));
};
