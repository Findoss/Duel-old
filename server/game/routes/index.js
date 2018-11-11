/* eslint no-console: 0 */
// правило отключено потому что это важыный элемент логов, необходимо вынести в модуль

const routeLobby = require('./lobby');

module.exports = async (ctx) => {
  const { socket } = ctx;

  socket.on('lobby', data => routeLobby({ ...ctx, data }));

  socket.on('disconnect', () => {
    routeLobby({ ...ctx, data: { route: 'del' } });
  });

  // DEBUG chat
  socket.on('chat', (data) => {
    ctx.io.emit('Chat', { user: socket.userId, message: data.payload });
    console.log('──‣ ┈┈┈┈┈ SEND ┬ chat');
    console.log('               │');
    console.log(`               │ ${data.payload}`);
    console.log('               │');
    console.log(`┈┈┈┈┈┈┈┈┈┈┈┈┈┈ ┴ ${data.payload}`);
  });
  // DEBUG chat-end
};
