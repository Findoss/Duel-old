const SeedRandom = require('seedrandom');

const Board = require('./board');
const Player = require('./player');
const Step = require('./step');
const Changes = require('./changes');

const configRunes = require('../../static/runes.json');


/**
 * Класс цикла игры
 * @class
 */
class Game {
  /**
   * @constructor
   * @param {Any} var desc
   */
  constructor(users, id) {
    const playerOne = users[0].id;
    const playerTwo = users[1].id;

    this.isInProcess = true;

    this.players = [new Player(playerOne), new Player(playerTwo)];
    this.board = new Board(configRunes);
    this.step = new Step(playerOne, playerTwo);
    this.seedRandom = new SeedRandom(id);
    this.changes = new Changes();
    this.modifiers = {
      aaa: [],
    };
  }

  /**
   * desc
   * @return {Any} desc
   */
  recovery() {
    return this;
  }
}

module.exports = Game;
