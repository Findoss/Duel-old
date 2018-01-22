module.exports = world => (coords) => {
  world.queue.add(world.viewBoard, 'renderDeleteRunes', true, coords);
};
