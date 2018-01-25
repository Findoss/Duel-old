/**
 * TODO
 * Комментарии
 */
module.exports = world => (dropRunes) => {
  if (dropRunes.length > 0) {
    world.queue.add(world.viewBoard, 'renderDrop', true, dropRunes);
  }
};
