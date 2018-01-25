/**
 * @typedef  {Object} hp
 * @property {Number} value    Текущее значение здоровья
 * @property {Number} limitat  Максимальное значение здоровья
 */
/**
 * @class
 */
class Player {
  /**
   * Конструктор персонажа
   * @constructor
   * @param {String} name
   * @param {String} avatar
   */
  constructor(name = 'name', avatar = 'human') {
    /**
     * Имя игрока
     * @type {String}
     */
    this.name = name;
    /**
     * Аватар
     * @type {String}
     */
    this.avatar = avatar;
    /**
     * Здоровье
     * @type {Object}
     */
    this.hp = {
      value: 150,
      limit: 150,
    };
    /**
     * Урон
     * @type {Number}
     */
    this.attak = 5;
    /**
     * Энергия
     * @type {Number}
     */
    this.energy = 5;
    /**
     * Лечение
     * @type {Number}
     */
    this.heal = 5;
    /**
     * Броня
     * @type {Number}
     */
    this.armor = 0;
    /**
     * Ярость
     * @type {Number}
     */
    this.rage = 0;
    /**
     * Удача
     * @type {Number}
     */
    this.luck = 0;
    /**
     * Блок
     * TODO dodge
     * @type {Number}
     */
    this.block = 0;
    /**
     * Массив накопленных рун
     * @type {Array} todo
     */
    this.runes = [];
    /**
     * Набор умений
     * @type {Array} todo
     */
    this.runes = [];
  }

  getPlayer() {
    return this;
  }

  // TODO hpp
  getHp() {
    return this.hp.value;
  }

  // TODO hpp
  setHp(count) {
    return this.hp.value + count
  }

  addRunes(runes) {
    this.runes = runes;
  }

  isLife() {
    return this.hpp() > 0;
  }
}

module.exports = Player;
