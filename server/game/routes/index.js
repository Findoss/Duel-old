const routeLobby = require('./lobby');

module.exports = async (ctx) => {
  const { socket } = ctx;

  socket.on('lobby', data => routeLobby({ ...ctx, data }));

  socket.on('disconnect', () => {
    routeLobby({ ...ctx, data: { route: 'del' } });
  });

  // debug
  socket.on('chat', (data) => {
    const newMsg = data.payload.split('').reverse().join('');
    ctx.io.emit('chat', newMsg);
    console.log('──‣ ┈┈┈┈┈ SEND ┬ chat');
    console.log('               │');
    console.log(`               │ ${data.payload}`);
    console.log('               │');
    console.log(`┈┈┈┈┈┈┈┈┈┈┈┈┈┈ ┴ ${newMsg}`);
  });
};
