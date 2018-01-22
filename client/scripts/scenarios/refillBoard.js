module.exports = world => (runes) => {
  world.queue.add(world.viewBoard, 'renderRefill', true, runes);
  // временно
  world.socket.emit('board/suggestion', world.id);
};
