const SeedRandom = require('seedrandom');

const Board = require('./board');
const User = require('./user');
const Step = require('./step');
const Changes = require('./changes');

const configRunes = require('../../static/runes.json');

/**
 *
 * @class
 */
class Game {
  /**
   * @constructor
   * @param {Any} var TODO
   */
  constructor(users, id, solt = '') {
    this.users = [
      new User(users[0].id, users[0].nickname, users[0].avatar),
      new User(users[1].id, users[1].nickname, users[1].avatar),
    ];
    this.board = new Board(configRunes);
    this.step = new Step(users[0].id, users[1].id);
    this.seedRandom = new SeedRandom(id + solt);
    this.changes = new Changes();
    this.timer = null;
    this.modifiers = {
      aaa: [],
    };
  }

  /**
   * TODO
   * @return {Any} desc
   */
  restore() {
    return {
      newBoard: this.board.getBoard(),
      users: this.users,
      step: this.step.getStep(),
    };
  }
}

module.exports = Game;
