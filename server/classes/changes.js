/**
 * Класс для сохранения промежуточных состояний игры
 * @class
 */
class Changes {
  /**
   * @constructor
   */
  constructor() {
    /**
     * Массив промежуточных состояний игры
     * @protected
     * @type {Array}
     */
    this.events = [];
  }

  /**
   * Добавление изменений
   * @param {String} event Событие игры
   * @param {Any} data  Данные события
   */
  add(event, data) {
    this.events.push({ event, data });
  }

  /**
   * Возвращает все накопленные промежуточные состояния игры и очищает массив
   * @return {Array} Возвращает все накопленные промежуточные состояния игры
   */
  release() {
    let data = [];
    if (this.events.length > 0) {
      data = this.events;
    }
    this.clean();
    return data;
  }

  /**
   * Очищает массив промежуточных состояний игры
   * @protected
   */
  clean() {
    this.events = [];
  }
}

module.exports = Changes;
