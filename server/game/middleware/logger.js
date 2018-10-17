module.exports = async (ctx) => {
  const { socket } = ctx;

  console.log('──‣ ┈┈ CONNECT │');
  console.log('               ⁞');

  socket.on('disconnect', () => {
    console.log('               ⁞');
    console.log(`──‣ DISCONNECT ┬ ${socket.userId || 'NOT AUTH'}`);
    console.log(`┈┈┈┈┈┈┈┈┈┈┈┈┈┈ ┴ io #${socket.id}`);
  });
};
