module.exports = world => ({ id, newBoard }) => {
  world.setIdRoom(id);
  if (world.viewLoader.loader !== null) {
    world.viewLoader.cleanLoder();
  }
  world.queue.add(world.viewBoard, 'renderBoard', true, newBoard);
  world.socket.emit('board/suggestion', world.idRoom);
};
