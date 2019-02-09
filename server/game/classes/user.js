const configUserAttributes = require('../../static/user_attributes.json');

/**
 * @typedef  {Object} health
 * @property {Number} value  Текущее значение здоровья
 * @property {Number} limit  Максимальное значение здоровья
 */
/**
 * Класс игрока
 * @class
 */
class User {
  /**
   * @constructor
   */
  constructor(id) {
    /**
     * id игрока
     * @type {String}
     */
    this.id = id;
    /**
     * Здоровье
     * @type {Object}
     */
    this.health = {
      value: configUserAttributes.health,
      limit: configUserAttributes.health,
    };
    /**
     * TODO описание
     * @type {Number}
     */
    this.afkCount = 0;
    /**
     * Урон
     * @type {Number}
     */
    this.force = configUserAttributes.force;
    /**
     * Энергия
     * @type {Number}
     */
    this.resources = {
      energy_1: 3,
      energy_2: 3,
      energy_3: 3,
    };
    /**
     * Лечение
     * @type {Number}
     */
    this.healing = configUserAttributes.healing;
    /**
     * Броня
     * @type {Number}
     */
    this.armor = configUserAttributes.armor;
    /**
     * Ярость
     * @type {Number}
     */
    this.rage = configUserAttributes.rage;
    /**
     * Удача
     * @type {Number}
     */
    this.luck = configUserAttributes.luck;
    /**
     * Блок
     * @type {Number}
     */
    this.dodge = configUserAttributes.dodge;
    /**
     * Массив накопленных рун
     * @type {Array}
     */
    this.runes = [];
    /**
     * Набор умений
     * @type {Array}
     */
    this.skills = [];
  }

  /**
   * Возвращает объект игрока
   * @return {User} Возвращает, объект игрока
   */
  getUser() {
    return this;
  }

  addFineAFK() {
    this.afkCount += 1;
    return this.afkCount;
  }

  getAFK() {
    return this.afkCount;
  }

  /**
   * Возвращает текущее здоровье игрока
   * @return {Number} Возвращает, текущее здоровье игрока
   */
  getHp() {
    return this.health.value;
  }

  /**
   * Устанавливает текущее здоровье игрока, значение может бытиь отрицательным
   * @param {Number} count Количество добавляемых едениц здоровья
   */
  setHp(count) {
    this.health.value += count;
    if (this.health.value > this.health.limit) this.health.value = this.health.limit;
    if (this.health.value < 0) this.health.value = 0;
    return this.health.value;
  }

  /**
   * Проверяет жив ли игрок (health > 0)
   * @return {Boolean} Возвращает, true если игрок жив, иначе false.
   */
  isLife() {
    return this.getHp() > 0;
  }
}

module.exports = User;
