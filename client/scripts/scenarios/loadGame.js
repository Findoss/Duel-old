module.exports = world => ({ gameID, newBoard, playerOne, playerTwo, step }) => {
  world.setIdRoom(gameID);
  if (world.viewLoader.loader !== null) {
    world.viewLoader.cleanLoder();
  }
  world.queue.add(world.viewBoard, 'renderBoard', true, newBoard);

  world.playerOne = playerOne.name
  world.playerTwo = playerTwo.name

  if (step) {
    world.step = '←'
  } else {
    world.step = '→'
  }


  world.socket.emit('board/suggestion', world.idRoom);
};
