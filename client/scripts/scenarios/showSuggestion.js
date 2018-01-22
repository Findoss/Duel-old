module.exports = world => (suggestions) => {
  world.queue.add(world.viewBoard, 'renderAllSuggestion', false, suggestions);
};
