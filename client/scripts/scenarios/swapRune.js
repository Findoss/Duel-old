module.exports = world => (coords) => {
  world.viewBoard.cleanSuggestion()
  world.queue.add(world.viewBoard, 'renderSwap', true, coords[0], coords[1])
}
