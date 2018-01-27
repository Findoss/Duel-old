/* eslint prefer-destructuring: ["error", {AssignmentExpression: {array: false}}] */
/**
 * TODO
 * Проверить более оптимальные варианты
 * Реализовать механику удачного хода -
 * принимать входящий шанс или сохранять из объекта игрока
 */

/**
 * Класс смены хода
 * @class
 */
class Step {
  /**
   * @constructor
   * @param {Array} players Имена игроков (между кем будет меняться ход)
   */
  constructor(...players) {
    /**
     * Массив имен игроков
     * @type {Array}
     */
    this.names = [
      players[0],
      players[1],
    ];
    /**
     * Текущий ход (содержит имя игрока)
     * @type {String}
     */
    this.step = '';
  }

  /**
   * Проверяет ход игрока
   * @param  {String} name Имя игрока
   * @return {Boolean} Возвращает, true если ход игрока, иначе false.
   */
  isStep(name) {
    return this.step === name;
  }

  /**
   * Возвращает текущий ход - имя игрока
   * @return {String} Возвращает, имя игрока
   */
  getStep() {
    return this.step;
  }

  /**
   * Определяет следующий ход
   * @param  {Number=} chance Шанс игрока на удачный ход (смена хода не происходит)
   * @return {String} Имя игрока
   */
  nextStep(chance = 0) {
    if (this.step === this.names[0]) {
      this.step = this.names[1];
    } else {
      this.step = this.names[0];
    }
    return this.step;
  }

  /**
   * Случайным образом определяет ход
   * @param  {Function} random Функция псевдослучайного генератора
   * @return {String} Имя игрока
   */
  coinToss(random) {
    const result = random();
    if (Math.floor(result * 2) === 0) {
      this.step = this.names[0];
    } else {
      this.step = this.names[1];
    }
    return this.step;
  }
}

module.exports = Step;
