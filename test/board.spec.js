/* globals describe, it */

const mocha = require('mocha');
const { expect } = require('chai');

const Board = require('../server/classes/board.js');
const rune = require('../server/configs/runes.js');

const board = new Board(rune);

describe('board', () => {
  //
  it('isEqualCoords', () => {
    const result1 = Board.isEqualCoords({ i: 0, j: 3 }, { i: 0, j: 3 });
    const result2 = Board.isEqualCoords({ i: 1, j: 3 }, { i: 0, j: 3 });

    expect(result1).to.be.true;
    expect(result2).to.be.false;
  });


  it('isEqualType', () => {
    const testBoard = [
      [1, 2, 3],
      [4, 5, 1],
      [2, 3, 4],
    ];

    board.loadBoard(testBoard);
    const result1 = board.isEqualType({ i: 0, j: 0 }, { i: 1, j: 2 });
    const result2 = board.isEqualType({ i: 0, j: 0 }, { i: 1, j: 1 });

    expect(result1).to.be.true;
    expect(result2).to.be.false;
  });

  it('isAdjacent', () => {
    const result1 = Board.isAdjacent({ i: 1, j: 1 }, { i: 1, j: 2 });
    const result2 = Board.isAdjacent({ i: 0, j: 0 }, { i: 1, j: 1 });

    expect(result1).to.be.true;
    expect(result2).to.be.false;
  });

  it('isInBoard', () => {
    const testBoard = [
      [1, 2, 3],
      [4, 5, 1],
      [2, 3, 4],
    ];

    board.loadBoard(testBoard);
    const result1 = board.isInBoard({ i: 1, j: 1 });
    const result2 = board.isInBoard({ i: 1, j: 4 });

    expect(result1).to.be.true;
    expect(result2).to.be.false;
  });

  it('swap', () => {
    const testBoard = [
      [1, 2, 3],
      [4, 5, 1],
      [2, 3, 4],
    ];

    const resultBoard = [
      [1, 2, 3],
      [5, 4, 1],
      [2, 3, 4],
    ];

    const testCoords = [
      { i: 1, j: 0 },
      { i: 1, j: 1 },
    ];

    board.loadBoard(testBoard);
    const result = board.swap(testCoords[0], testCoords[1]);

    expect(result).to.eql(testCoords, 'return');
    expect(board.getBoard()).to.eql(resultBoard, 'state');
  });

  it('findMoves', () => {
    const testBoard = [
      [4, 4, 1, 2, 3, 3],
      [4, 2, 5, 3, 2, 4],
      [1, 5, 2, 4, 5, 1],
      [2, 3, 1, 3, 1, 2],
      [5, 1, 2, 5, 4, 4],
      [2, 3, 4, 2, 3, 5]];

    const resultCoords = [
      [{ i: 0, j: 3 }, { i: 1, j: 3 }],
    ];

    board.loadBoard(testBoard);
    const result = board.findMoves();

    expect(result).to.eql(resultCoords, 'return');
  });

  describe('clusters', () => {
    it('getClusters', () => {
      const testBoard = [
        [1, 1, 1],
        [4, 1, 1],
        [2, 1, 4],
      ];

      const resultCoords = [
        [{ i: 0, j: 0 }, { i: 0, j: 1 }, { i: 0, j: 2 }],
        [{ i: 0, j: 1 }, { i: 1, j: 1 }, { i: 2, j: 1 }],
      ];

      board.loadBoard(testBoard);
      board.findAllClusters();
      const result = board.getClusters();

      expect(result).to.eql(resultCoords, 'result');
    });

    it('cleanClusters', () => {
      const testBoard = [
        [1, 1, 1],
        [4, 1, 1],
        [2, 1, 4],
      ];

      board.loadBoard(testBoard);
      board.findAllClusters();
      board.cleanClusters();
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

      const resultCoords = [
        [{ i: 3, j: 3 }, { i: 3, j: 4 }, { i: 3, j: 5 }],
        [{ i: 3, j: 4 }, { i: 4, j: 4 }, { i: 5, j: 4 }],
      ];

      board.loadBoard(testBoard);
      board.findAllClusters();

      expect(board.getClusters()).to.eql(resultCoords, 'return');
    });

    it('isClusters true', () => {
      const testBoard = [
        [1, 1, 1],
        [4, 1, 1],
        [2, 1, 4],
      ];

      board.loadBoard(testBoard);
      board.findAllClusters();
      const result = board.isClusters();

      expect(result).to.be.true;
    });

    it('isClusters false', () => {
      const testBoard = [
        [1, 3, 1],
        [4, 0, 1],
        [2, 1, 4],
      ];

      board.loadBoard(testBoard);
      board.findAllClusters();
      const result = board.isClusters();

      expect(result).to.be.false;
    });

    it('isInNewCluster', () => {
      const testBoards = [
        [
          [1, 3, 2],
          [4, 0, 2],
          [2, 1, -1]],
        [
          [1, 3, 4],
          [4, 0, 4],
          [3, 3, -1]],
        [
          [1, 3, 4],
          [4, 0, 4],
          [2, 1, -1]],
      ];

      testBoards.forEach((testBoard, i) => {
        board.loadBoard(testBoard);
        const result = board.isInNewCluster(2, 2, i + 2);
        expect(result).to.be.true;
      });
    });

    it('deleteClusters', () => {
      const testBoard = [
        [1, 1, 2, 5, 2, 3],
        [1, 2, 4, 4, 5, 5],
        [4, 3, 4, 1, 1, 5],
        [1, 2, 3, 2, 2, 2],
        [2, 5, 5, 3, 2, 5],
        [3, 3, 4, 4, 2, 3],
      ];

      const resultBoard = [
        [1, 1, 2, 5, 2, 3],
        [1, 2, 4, 4, 5, 5],
        [4, 3, 4, 1, 1, 5],
        [1, 2, 3, -1, -1, -1],
        [2, 5, 5, 3, -1, 5],
        [3, 3, 4, 4, -1, 3],
      ];

      const resultCoords = [
        { i: 3, j: 3 },
        { i: 3, j: 4 },
        { i: 3, j: 5 },
        { i: 4, j: 4 },
        { i: 5, j: 4 },
      ];

      board.loadBoard(testBoard);
      board.findAllClusters();
      const result = board.deleteClusters();

      expect(result).to.eql(resultCoords, 'result');
      expect(board.getBoard()).to.eql(resultBoard, 'state');
    });
  });
  describe('drop', () => {
    it('drop 1', () => {
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

      const testCoords = [
        [{ i: 0, j: 1 }, { i: 4, j: 1 }],
        [{ i: 3, j: 2 }, { i: 4, j: 2 }],
        [{ i: 2, j: 2 }, { i: 3, j: 2 }],
        [{ i: 0, j: 2 }, { i: 2, j: 2 }],
        [{ i: 2, j: 3 }, { i: 5, j: 3 }],
        [{ i: 0, j: 3 }, { i: 4, j: 3 }],
        [{ i: 3, j: 4 }, { i: 4, j: 4 }],
        [{ i: 2, j: 4 }, { i: 3, j: 4 }],
        [{ i: 1, j: 4 }, { i: 2, j: 4 }],
        [{ i: 0, j: 4 }, { i: 1, j: 4 }],
      ];

      board.loadBoard(testBoards[0]);
      const result = board.drop();

      expect(result).to.eql(testCoords, 'result');
      expect(board.getBoard()).to.eql(testBoards[1], 'state');
    });

    it('drop 2', () => {
      const testBoard = [
        [1, -1, -1, -1, -1, 3],
        [3, -1, -1, -1, 5, 5],
        [4, -1, 3, -1, 4, 3],
        [1, -1, 4, -1, 2, 1],
        [5, 2, 2, 4, 2, 5],
        [4, 1, 1, 1, 3, 3]];

      board.loadBoard(testBoard);
      const result = board.drop();
      expect(result).to.be.empty;
    });
  });
});
