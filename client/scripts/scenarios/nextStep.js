module.exports = world => (step) => {
  if (step) {
    world.step = '←'
  } else {
    world.step = '→'
  }
  world.socket.emit('board/suggestion', world.idRoom);
};
