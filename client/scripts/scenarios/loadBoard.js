module.exports = world => (newBoard) => {
  world.queue.add(world.viewBoard, 'renderBoard', true, newBoard)
  world.socket.emit('board/suggestion')
}
