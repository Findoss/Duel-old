const mocha = require('mocha');
const chai = require('chai');

const Board = require('../server/classes/board.js');
const rune = require('../server/configs/runes.js');

const board = new Board(rune);

mocha.describe('border', () => {
  mocha.it('0 swap - параметры корректные (результат)', () => {
    const coords = [
      { i: 2, j: 4 },
      { i: 3, j: 4 },
    ];
    const result = board.swap(coords[0], coords[1]);
    chai.expect(result).to.eql([coords[0], coords[1]]);
  });

  mocha.it('1 swap - параметры пустые', () => {
    const badFn = () => {
      board.swap();
    };
    chai.expect(badFn).to.throw();
  });

  mocha.it('2 swap - параметры не корректные', () => {
    const badFn = () => {
      board.swap('4554');
    };
    chai.expect(badFn).to.throw();
  });

  mocha.it('3 swap - параметры не корректные 2', () => {
    //
    const testBoard = [
      [1, 2, 3],
      [4, 5, 1],
      [2, 3, 4]];
    //
    board.loadBoard(testBoard);
    const badFn = () => {
      board.swap({ i: 2, j: 4 }, { i: 3, j: 4 });
    };
    chai.expect(badFn).to.throw();
  });

  mocha.it('4 swap - параметры корректные (поле)', () => {
    //
    const boards = [
      [
        [1, 2, 3],
        [4, 5, 1],
        [2, 3, 4]],
      [
        [1, 2, 3],
        [5, 4, 1],
        [2, 3, 4]],
    ];
    //
    board.loadBoard(boards[0]);
    board.swap({ i: 1, j: 0 }, { i: 1, j: 1 });
    chai.expect(board.getBoard()).to.eql(boards[1]);
  });

  mocha.it('5 swap = 0 + 4', () => {
    //
    const boards = [
      [
        [1, 2, 3],
        [4, 5, 1],
        [2, 3, 4]],
      [
        [1, 2, 3],
        [5, 4, 1],
        [2, 3, 4]],
    ];

    const coords = [
      { i: 1, j: 0 },
      { i: 1, j: 1 },
    ];
    //
    board.loadBoard(boards[0]);
    const result = board.swap(coords[0], coords[1]);

    chai.expect(board.getBoard()).to.eql(boards[1]);
    chai.expect(result).to.eql([coords[0], coords[1]]);
  });


  // mocha.it('findAllClusters', () => {
  //   //
  //   const boards = [
  //     [
  //       [1, 1, 2, 5, 2, 3],
  //       [1, 2, 4, 4, 5, 5],
  //       [4, 3, 4, 1, 1, 5],
  //       [1, 2, 3, 2, 2, 2],
  //       [2, 5, 5, 3, 2, 5],
  //       [3, 3, 4, 4, 2, 3]],
  //     [
  //       [{ i: 3, j: 3 }, { i: 3, j: 4 }, { i: 3, j: 5 }],
  //       [{ i: 3, j: 4 }, { i: 4, j: 4 }, { i: 5, j: 4 }],
  //     ],
  //   ];
  //   //
  //   board.loadBoard(boards[0]);
  //   board.findAllClusters();
  //   chai.expect(board.getClusters()).to.eql(boards[1]);
  // });
  //
  // mocha.it('deleteClusters', () => {
  //   //
  //   const boards = [
  //     [
  //       [1, 1, 2, 5, 2, 3],
  //       [1, 2, 4, 4, 5, 5],
  //       [4, 3, 4, 1, 1, 5],
  //       [1, 2, 3, 2, 2, 2],
  //       [2, 5, 5, 3, 2, 5],
  //       [3, 3, 4, 4, 2, 3]],
  //     [
  //       [1, 1, 2, 5, 2, 3],
  //       [1, 2, 4, 4, 5, 5],
  //       [4, 3, 4, 1, 1, 5],
  //       [1, 2, 3, -1, -1, -1],
  //       [2, 5, 5, 3, -1, 5],
  //       [3, 3, 4, 4, -1, 3]],
  //   ];
  //   //
  //   board.loadBoard(boards[0]);
  //   board.findAllClusters();
  //   board.deleteClusters();
  //   chai.expect(board.getBoard()).to.eql(boards[1]);
  // });
  //
  // mocha.it('drop', () => {
  //   //
  //   const boards = [
  //     [
  //       [1, 2, 3, 4, 5, 3],
  //       [3, -1, -1, -1, 4, 5],
  //       [4, -1, 4, 1, 2, 3],
  //       [1, -1, 2, -1, 2, 1],
  //       [5, -1, -1, -1, -1, 5],
  //       [4, 1, 1, -1, 3, 3]],
  //     [
  //       [1, -1, -1, -1, -1, 3],
  //       [3, -1, -1, -1, 5, 5],
  //       [4, -1, 3, -1, 4, 3],
  //       [1, -1, 4, -1, 2, 1],
  //       [5, 2, 2, 4, 2, 5],
  //       [4, 1, 1, 1, 3, 3]],
  //   ];
  //   //
  //   board.loadBoard(boards[0]);
  //   board.drop();
  //   chai.expect(board.getBoard()).to.eql(boards[1]);
  // });
});
