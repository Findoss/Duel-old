const mocha = require('mocha');
const chai = require('chai');

const Board = require('../server/classes/board.js');
const rune = require('../server/configs/runes.js');

const board = new Board(rune);


const boards = [
  [[1, 2, 3, 4, 5, 3],
    [3, -1, -1, -1, 4, 5],
    [4, -1, 4, 1, 2, 3],
    [1, -1, 2, -1, 2, 1],
    [5, -1, -1, -1, -1, 5],
    [4, 1, 1, -1, 3, 3]],

  [[1, -1, -1, -1, -1, 3],
    [3, -1, -1, -1, 5, 5],
    [4, -1, 3, -1, 4, 3],
    [1, -1, 4, -1, 2, 1],
    [5, 2, 2, 4, 2, 5],
    [4, 1, 1, 1, 3, 3]],
];

mocha.describe('border', () => {
  mocha.it('drop base', () => {
    board.loadBoard(boards[0]);
    board.drop();
    chai.expect(board.getBoard()).to.eql(boards[1]);
  });
});
