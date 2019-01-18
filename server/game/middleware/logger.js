module.exports = async (ctx) => {
  const { state, socket } = ctx;

  console.log('──‣ ┈┈ CONNECT │');
  console.log('               ⁞');

  socket.on('disconnect', () => {
    console.log('               ⁞');
    console.log(`──‣ DISCONNECT ┬ ${state.id || 'NOT AUTH'}`);
    console.log(`┈┈┈┈┈┈┈┈┈┈┈┈┈┈ ┴ io #${state.id}`);
  });
};
