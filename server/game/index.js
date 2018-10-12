const { checkSocketToken } = require('../api/controllers/token');


module.exports = (socket) => {
  //
  socket.on('connection', async (socketUser) => {
    const userId = await checkSocketToken(socketUser.handshake.query.bearer);
    console.log(`──‣ ┈┈ CONNECT ┬ ${userId || 'NOT AUTH'}`);
    console.log(`               │ ${socketUser.id.slice(0, 5)}`);
    console.log('               ⁞');

    socketUser.on('chat message', (msg) => {
      const newMsg = msg.split('').reverse().join('');
      socket.emit('chat message', newMsg);
      console.log('──‣ ┈┈┈┈┈ SEND ┬ /chat message');
      console.log(`               │ ${msg}`);
      console.log('               │');
      console.log(`┈┈┈┈┈┈┈┈┈┈┈┈┈┈ ┴ ${newMsg}`);
    });

    socketUser.on('disconnect', () => {
      console.log('               ⁞');
      console.log(`──‣ DISCONNECT ┬ ${userId || 'NOT AUTH'}`);
      console.log(`               │ ${socketUser.id.slice(0, 5)}`);
      console.log('┈┈┈┈┈┈┈┈┈┈┈┈┈┈ ┴');
    });
  });
};
