/**
 * @class
 * Типы рун
 * 0 - пустая (удаленная) руна
 * 1 - атакующая руна
 * 2 - лечащая руна
 * 3 - руна магии 1
 * 4 - руна магии 2
 * 5 - руна магии 3
 * 6 - радужная руна
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
     * Предыдущий тип руны
     * @type {Number}
     */
    this.oldType = 0
  }

  /**
   * Устанавливает случайный новый тип руны (от 1 до `maxCountType`)
   * @param  {Number} maxCountType Максимальный допустимый тип руны
   * @return {Number} Тип руны
   */
  newRandomType (maxCountType) {
    this.oldType = this.type
    this.type = Math.floor(Math.random() * (maxCountType)) + 1
    return this.type
  }

  /**
   * Текущее значение сохраняет в `oldType` и устанавливает новый тип руны
   * @param  {Number} type Тип руны
   */
  newType (type) {
    this.oldType = this.type
    this.type = type
  }
}