module.exports = async (ctx) => {
  const { store, userId } = ctx;
  const { socket } = store.players[userId];

  console.log('               │ CONNECT');
  console.log('┈┈┈┈┈┈┈┈┈┈┈┈┈┈ ┴');

  socket.on('disconnect', () => {
    console.log('               ⁞');
    console.log(`──‣ DISCONNECT ┬ ${userId || 'NOT AUTH'}`);
    console.log(`               │ io #${socket.id}`);
    console.log('┈┈┈┈┈┈┈┈┈┈┈┈┈┈ ┴ ');
  });
};
