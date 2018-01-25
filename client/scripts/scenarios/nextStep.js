/**
 * TODO
 * Комментарии
 */
module.exports = world => (step) => {
  if (world.playerLeft.name === step) {
    world.step = '←';
    world.queue.add(world.viewBoard, 'unblockBoard', false);
    world.socket.emit('board/suggestion', world.idRoom);
  } else {
    world.step = '→';
    world.queue.add(world.viewBoard, 'blockBoard', false);
  }
};
