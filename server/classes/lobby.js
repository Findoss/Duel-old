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
   */
  isThereAnEnemy() {
    return this.lobby.length > 1;
  }

  /**
   * Добавление игрока в очередь подбора
   */
  addPlayer(socket, name) {
    this.lobby.push({socket, name});
  }

  /**
   * Удаление игрока из очереди подбора
   */
  deletePlayer(socket) {
    const indexPlayer = this.isPlayerInLobby(socket);
    if (indexPlayer > -1) {
      this.lobby.splice(indexPlayer, 1);
    }
  }

  /**
   *
   */
  isPlayerInLobby(socket) {
    return this.lobby.findIndex(lobbyPlayer => lobbyPlayer.socket.id === socket.id);
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
