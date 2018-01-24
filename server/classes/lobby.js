const log = require('../../libs/log');

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
   * @return {Boolean}
   */
  isThereAnEnemy() {
    return this.lobby.length > 1;
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
   */
  deletePlayer(player) {
    const indexPlayer = this.isPlayerInLobby(player);
    if (indexPlayer > -1) {
      this.lobby.splice(indexPlayer, 1);
    }
  }

  /**
   *
   */
  isPlayerInLobby(player) {
    return this.lobby.findIndex(lobbyPlayer => lobbyPlayer.id === player.id);
  }

  /**
   *
   */
  pairOfPlayers() {
    const playerOne = this.lobby.shift();
    const playerTwo = this.lobby.shift();
    return [playerOne, playerTwo];
  }
}

module.exports = Lobby;
