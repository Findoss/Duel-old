const { checkSocketToken } = require('../../api/controllers/token');

module.exports = async (socket, next) => {
  const userId = await checkSocketToken(socket.handshake.query.bearer);

  console.log(`──‣ ┈┈┈┈┈ AUTH ┬ ${userId || 'NOT AUTH'}`);
  console.log(`               │ io #${socket.id}`);
  console.log(`${!userId ? '┈┈┈┈┈┈┈┈┈┈┈┈┈┈ ┴':'               │'}`);


  if (userId) {
    socket.userId = userId;
    return next();
  }
  return new Error('no auth');
};
