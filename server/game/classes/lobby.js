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
   * Добавление игрока в очередь подбора
   * @param {Socket} socket Сокет игрока
   * @param {String} id Id игрока
   * @param {Number} rank
   * @param {Number} time // ?????
   */
  addUser(socket, id, rank, time) {
    this.lobby.push({
      socket, id, rank, time,
    });
  }

  /**
   * Удаление игрока из очереди подбора
   * @param {String} id Id игрока
   */
  deleteUser(id) {
    const indexUser = this.isUserInLobby(id);
    if (indexUser > -1) {
      this.lobby.splice(indexUser, 1);
    }
  }

  /**
   * Проверяет есть ли игрок в очереди для подбора
   * @param  {String} id Id игрока
   * @return {Boolean} Возвращает, true если есть игрок в очереди, иначе false.
   */
  isUserInLobby(id) {
    return this.lobby.findIndex(lobbyUser => lobbyUser.id === id);
  }

  /**
   * Формирует пару игроков для игры, удаляя их из очереди подбора
   * @return {Arry} Возвращает, массив с парой игроков, удаляя их из очереди подбора
   */
  pairOfUsers() {
    const userOne = this.lobby.shift();
    const userTwo = this.lobby.shift();
    return [userOne, userTwo];
  }

  /**
   *
   */
  count() {
    return this.lobby.length;
  }

  /**
   *
   */
  listUserId() {
    return this.lobby.map(user => user.id);
  }

  /**
   *
   */
  listSerchTime() {
    return this.lobby.map(user => ({
      socket: user.socket,
      time: user.time,
    }));
  }

  /**
   *
   */
  serchOpponent() {
    // супер функция подбора
    if (this.lobby.length >= 2) {
      return this.pairOfUsers();
    }
    this.lobby.forEach((user, i) => { this.lobby[i].time -= 1; });
    return false;
  }

  /**
   *
   */
  clear() {
    const deleteUsers = [];
    this.lobby.forEach((user, i) => {
      if (this.lobby[i].time < 0) {
        deleteUsers.push(user);
        this.deleteUser(this.lobby[i].id);
      }
    });

    return deleteUsers;
  }
}

module.exports = Lobby;
