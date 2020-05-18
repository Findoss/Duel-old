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
    /**
     * TODO описание
     * @type {Number}
     */
    this.allEventCount = 0;
    /**
     * TODO описание
     * @type {Number}
     */
    this.lastEventNumber = 0;
  }

  /**
   * Добавление изменений
   * @param {String} event Событие игры
   * @param {Any}    data  Данные события
   */
  add(event, data) {
    this.allEventCount += 1;
    this.events.push({ event, data });
  }

  getAllEventCount() {
    return this.allEventCount;
  }

  getLastEventNumber() {
    return this.lastEventNumber;
  }

  /**
   * TODO описание
   */
  fixEventNumber() {
    this.lastEventNumber = this.allEventCount;
    return this.lastEventNumber;
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
