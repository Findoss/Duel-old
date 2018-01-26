/**
 * TODO
 * Комментарии
 */
module.exports = world => (runes) => {
  world.queue.add(world.viewBoard, 'renderRefill', true, runes);
};
