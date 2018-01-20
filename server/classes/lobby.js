/**
 * @class
 */
class Lobby {
  constructor () {
    this.lobby = []
  }

  isWaitOpponent () {
    return this.lobby.length > 0
  }

  addPlayer (player) {
    this.lobby.push(player)
  }

  shiftPlayer () {
    let player = this.lobby[0]
    this.lobby = []
    return player
  }
}

module.exports = Lobby
