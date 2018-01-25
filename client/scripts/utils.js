/* eslint-disable no-param-reassign */
/**
 * Вспомогательный класс для движка,
 * все методы статичны
 * @class
 */
class Utils {
  /**
   * Функция изменяет размер игры
   * @static
   * @param  {Phaser} game
   */
  static resizeGame(game) {
    game.scale.scaleMode = 2;
    game.scale.setShowAll();
    game.scale.refresh();
  }

  /**
   * @link server/classes/board.js isAdjacent
   */
  static isAdjacent(coordOne, coordTwo) {
    const a = Math.abs(coordTwo.i - coordOne.i);
    const b = Math.abs(coordTwo.j - coordOne.j);
    return a + b === 1;
  }

  /**
   * Выводит на экран количество fps
   * @param  {Phaser} game
   */
  static fps(game) {
    game.debug.text(`FPS: ${game.time.fps}`, 20, 30, '#00ff00', '25px Arial');
  }
}

module.exports = Utils;
