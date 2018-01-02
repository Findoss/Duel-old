/**
 * @typedef  {Object} coord
 * @property {Number} i Строка
 * @property {Number} j Колонка
 * @example
 * Object = {i:0, j:3}
 */

 /**
  * @typedef  {Object} region
  * @property {coord} start Верхняя левая точка региона
  * @property {coord} end   Нижняя правая точка региона
  * @example
  * Object = {
      start: {i: 0, j: 0},
      end:   {i: 100, j: 100}
    }
  */

/**
 * @typedef  {Object} rune
 * @property {Number} chance Максимальный процент количества рун на поле от общего числа
 * @property {region} region Допустимые границы генерации руны
 * @example
 * Object = {
     chance: 15,
     region: {
       start: {i: 0, j: 0},
       end: {i: 100, j: 100}
     }
   }
*/


/**
 * Логическое представление игрового поля (основная механика игры)
 * @class
 */
class Board {
  /**
   * Конструктор объекта поля
   * @constructor
   * @param {Array.<rune>} runes   Список генерируемых рун
   * @param {Number=}      rows    Количество строк поля
   * @param {Number=}      columns Количество колонок поля
   */
  constructor (runes, rows = 6, columns = 6) {
    /**
     * Список генерируемых рун
     * @type {Array.TODO}
     */
    this.runes = runes
    /**
     * Количество колонок поля
     * @type {Number}
     */
    this.rows = rows
    /**
     * Количество строк поля
     * @type {Number}
     */
    this.columns = columns

    /**
     * Поле
     * @type {Array.Number}
     */
    this.board = []
  }

  /**
   * Загружает сохраненное поле
   * @param  {Array.Number} savedBoard сохраненное поле
   * @return {Array.Number} Копия игрового поля `board`
   */
  loadBoard (savedBoard) {
    this.board = []
    this.rows = savedBoard.length
    this.columns = savedBoard[0].length
    this.board = savedBoard
    return this.board
  }
}

module.exports = Board
