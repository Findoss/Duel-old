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
    const userOne = users[0].id;
    const userTwo = users[1].id;

    this.users = [new User(userOne), new User(userTwo)];
    this.board = new Board(configRunes);
    this.step = new Step(userOne, userTwo);
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
