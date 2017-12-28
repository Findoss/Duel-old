/**
 * @class
 */
class Rune {
  /**
   * Конструктор объекта руна
   * @constructor
   * @param {Number} type
   */
  constructor (type) {
    /**
     * Тип руны
     * @type {Number}
     */
    this.type = type
    /**
     * Предыдущие типы руны
     * @type {Number}
     */
    this.oldTypes = [type]
  }

  /**
   * Текущее значение сохраняет в `oldType` и устанавливает новый тип руны
   * @param  {Number} type Тип руны
   */
  newType (type) {
    this.oldTypes.push(this.type)
    this.type = type
  }
}

module.exports = Rune
