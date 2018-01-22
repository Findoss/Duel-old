/**
 * Класс для подбора игроков
 * @class
 */
class Lobby {
  /**
   * @constructor
   */
  constructor() {
    /**
     * Массив игроков в очереди
     * @protected
     * @type {Array}
     */
    this.lobby = [];
  }

  /**
   * Возвращает есть ли в очереди подбора игроки
   * @return {Boolean} [description]
   */
  isWaitOpponent() {
    return this.lobby.length > 0;
  }

  /**
   * Добавление игрока в очередь подбора
   * @param {Socket} player сокет игрока
   */
  addPlayer(player) {
    this.lobby.push(player);
  }

  /**
   * Удаление игрока из очереди подбора
   * @return {Socket} Возвращает сокет удаляемого игрока из очереди подбора
   */
  shiftPlayer() {
    const player = this.lobby[0];
    this.lobby = [];
    return player;
  }
}

module.exports = Lobby;
