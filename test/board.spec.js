/* globals describe, it */
const mocha = require('mocha');
const { expect } = require('chai');

const Board = require('../server/classes/board.js');
const rune = require('../server/configs/runes.js');

const board = new Board(rune);

describe('board', () => {
  it('swap', () => {
    const testBoards = [
      [
        [1, 2, 3],
        [4, 5, 1],
        [2, 3, 4]],
      [
        [1, 2, 3],
        [5, 4, 1],
        [2, 3, 4]],
    ];

    const testCoords = [
      { i: 1, j: 0 },
      { i: 1, j: 1 },
    ];

    board.loadBoard(testBoards[0]);
    const result = board.swap(testCoords[0], testCoords[1]);

    expect(result).to.eql(testCoords);
    expect(board.getBoard()).to.eql(testBoards[1]);
  });

  it('findAllClusters', () => {
    const testBoard = [
      [1, 1, 2, 5, 2, 3],
      [1, 2, 4, 4, 5, 5],
      [4, 3, 4, 1, 1, 5],
      [1, 2, 3, 2, 2, 2],
      [2, 5, 5, 3, 2, 5],
      [3, 3, 4, 4, 2, 3],
    ];

    const testCoords = [
      [{ i: 3, j: 3 }, { i: 3, j: 4 }, { i: 3, j: 5 }],
      [{ i: 3, j: 4 }, { i: 4, j: 4 }, { i: 5, j: 4 }],
    ];

    //
    board.loadBoard(testBoard);
    board.findAllClusters();
    expect(board.getClusters()).to.eql(testCoords);
  });

  it('deleteClusters', () => {
    const testBoards = [
      [
        [1, 1, 2, 5, 2, 3],
        [1, 2, 4, 4, 5, 5],
        [4, 3, 4, 1, 1, 5],
        [1, 2, 3, 2, 2, 2],
        [2, 5, 5, 3, 2, 5],
        [3, 3, 4, 4, 2, 3]],
      [
        [1, 1, 2, 5, 2, 3],
        [1, 2, 4, 4, 5, 5],
        [4, 3, 4, 1, 1, 5],
        [1, 2, 3, -1, -1, -1],
        [2, 5, 5, 3, -1, 5],
        [3, 3, 4, 4, -1, 3]],
    ];
    //
    board.loadBoard(testBoards[0]);
    board.findAllClusters();
    board.deleteClusters();
    expect(board.getBoard()).to.eql(testBoards[1]);
  });

  it('drop', () => {
    const testBoards = [
      [
        [1, 2, 3, 4, 5, 3],
        [3, -1, -1, -1, 4, 5],
        [4, -1, 4, 1, 2, 3],
        [1, -1, 2, -1, 2, 1],
        [5, -1, -1, -1, -1, 5],
        [4, 1, 1, -1, 3, 3]],
      [
        [1, -1, -1, -1, -1, 3],
        [3, -1, -1, -1, 5, 5],
        [4, -1, 3, -1, 4, 3],
        [1, -1, 4, -1, 2, 1],
        [5, 2, 2, 4, 2, 5],
        [4, 1, 1, 1, 3, 3]],
    ];

    board.loadBoard(testBoards[0]);
    board.drop();
    expect(board.getBoard()).to.eql(testBoards[1]);
  });
});
