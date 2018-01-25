module.exports = world => ({ gameID, newBoard, players, step }) => {

  world.setIdRoom(gameID);
  if (world.viewLoader.loader !== null) {
    world.viewLoader.cleanLoder();
  }

  world.queue.add(world.viewBoard, 'blockBoard', false);
  world.queue.add(world.viewBoard, 'renderBoard', true, newBoard);

  if (sessionStorage.getItem('myName') === players[0].name) {
    world.playerLeft = players[0]
    world.playerRight =  players[1]
  } else {
    world.playerLeft = players[1]
    world.playerRight = players[0]
  }

  if (world.playerLeft.name === step) {
    world.step = '←'
    world.queue.add(world.viewBoard, 'unblockBoard', false);
    world.socket.emit('board/suggestion', world.idRoom);
  } else {
    world.step = '→'
  }
};
