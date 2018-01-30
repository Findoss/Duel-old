/**
 * TODO
 * Блокировку заменить уворотом
 */

/**
 * @typedef  {Object} hp
 * @property {Number} value  Текущее значение здоровья
 * @property {Number} limit  Максимальное значение здоровья
 */
/**
 * Класс игрока
 * @class
 */
class Player {
  /**
   * @constructor
   * @param {String} name Имя игрока
   * @param {String} avatar Название изображения игрока
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
     * @type {Number}
     */
    this.block = 0;
    /**
     * Массив накопленных рун
     * @type {Array}
     */
    this.runes = [];
    /**
     * Набор умений
     * @type {Array}
     */
    this.spells = [];
  }

  /**
   * Возвращает объект игрока
   * @return {Player} Возвращает, объект игрока
   */
  getPlayer() {
    return this;
  }

  /**
   * Возвращает текущее здоровье игрока
   * @return {Number} Возвращает, текущее здоровье игрока
   */
  getHp() {
    return this.hp.value;
  }

  /**
   * Устанавливает текущее здоровье игрока, значение может бытиь отрицательным
   * @param {Number} count Количество добавляемых едениц здоровья
   */
  setHp(count) {
    this.hp.value += count;
    if (this.hp.value > this.hp.limit) this.hp.value = this.hp.limit;
    if (this.hp.value < 0) this.hp.value = 0;
    return this.hp.value;
  }

  /**
   * Проверяет жив ли игрок (hp > 0)
   * @return {Boolean} Возвращает, true если игрок жив, иначе false.
   */
  isLife() {
    return this.getHp() > 0;
  }
}

module.exports = Player;
