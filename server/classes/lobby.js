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
   * Возвращает есть ли доступный противник
   * @return {Boolean} Возвращает, true если есть доступные игроки для создания пары, иначе false.
   */
  isThereAnEnemy() {
    return this.lobby.length > 1;
  }

  /**
   * Добавление игрока в очередь подбора
   * @param {Socket} socket Сокет игрока
   * @param {String} name Имя игрока
   */
  addPlayer(socket, name) {
    this.lobby.push({ socket, name });
  }

  /**
   * Удаление игрока из очереди подбора
   * @param {Socket} socket Сокет игрока
   */
  deletePlayer(socket) {
    const indexPlayer = this.isPlayerInLobby(socket);
    if (indexPlayer > -1) {
      this.lobby.splice(indexPlayer, 1);
    }
  }

  /**
   * Проверяет есть ли игрок в очереди для подбора
   * @param  {Socket} socket Сокет игрока
   * @return {Boolean} Возвращает, true если есть игрок в очереди, иначе false.
   */
  isPlayerInLobby(socket) {
    return this.lobby.findIndex(playerInLobby => playerInLobby.socket.id === socket.id);
  }

  /**
   * Формирует пару игроков для игры, удаляя их из очереди подбора
   * @return {Arry} Возвращает, массив с парой игроков, удаляя их из очереди подбора
   */
  pairOfPlayers() {
    const playerOne = this.lobby.shift();
    const playerTwo = this.lobby.shift();
    return [playerOne, playerTwo];
  }
}

module.exports = Lobby;
