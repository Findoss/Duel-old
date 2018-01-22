/* eslint-disable no-param-reassign */

class Utils {
  static resizeGame(game) {
    game.scale.scaleMode = 2;
    game.scale.setShowAll();
    game.scale.refresh();
  }

  static isAdjacent(coordOne, coordTwo) {
    const a = Math.abs(coordTwo.i - coordOne.i);
    const b = Math.abs(coordTwo.j - coordOne.j);
    return a + b === 1;
  }

  static fps(game) {
    game.debug.text(`FPS: ${game.time.fps}`, 20, 30, '#00ff00', '25px Arial');
  }
}

module.exports = Utils;
