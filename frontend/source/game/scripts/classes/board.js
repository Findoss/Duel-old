/* global Phaser, Rune */

class Board {
  constructor (rows, columns, countGenerateRunes, minMoveCount) {
    this.rows = rows || 6
    this.columns = columns || 6
    this.countGenerateRunes = countGenerateRunes || 5
    this.minMoveCount = minMoveCount || 3

    this.board = []
    this.moves = []
    this.clusters = []

    this.onDelete = new Phaser.Signal()
    this.onLoad = new Phaser.Signal()
    this.onSwap = new Phaser.Signal()
    this.onDrop = new Phaser.Signal()
    this.onRefill = new Phaser.Signal()
  }

  // number → []
  getColumn (index) {
    let column = []
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        if (j === index) {
          column.push(this.board[i][j])
          break
        }
      }
    }
    return column
  }

  // number → []
  getRow (index) {
    return this.board[index]
  }

  // () → bool
  deleteBoard () {
    if (this.board !== undefined) {
      delete this.board
      this.onLoad.dispatch()
      return true
    }
    return false
  }

  // [][] → bool
  validatorSavedBoard (savedBoard) {
    if (savedBoard.length > 3 && savedBoard[0].length > 3) {
      for (let i = 0; i < savedBoard.length; i++) {
        for (let j = 0; j < savedBoard[0].length; j++) {
          if (savedBoard[i][j].type === undefined) {
            if (savedBoard[i][j] < 0 || savedBoard[i][j] > this.countGenerateRunes) {
              return false
            }
          } else {
            if (savedBoard[i][j].type < 0 || savedBoard[i][j].type > this.countGenerateRunes) {
              return false
            }
          }
        }
      }
      return true
    }
    return false
  }

  // [][] → copy[][].Rune
  //      → false
  loadBoard (savedBoard) {
    if (this.validatorSavedBoard(savedBoard)) {
      this.deleteBoard()
      this.board = []
      this.rows = savedBoard.length
      this.columns = savedBoard[0].length
      for (let i = 0; i < this.rows; i++) {
        this.board[i] = []
        for (let j = 0; j < this.columns; j++) {
          if (savedBoard[i][j].type === undefined) {
            this.board[i][j] = new Rune(savedBoard[i][j])
          } else {
            this.board[i][j] = new Rune(savedBoard[i][j].type)
          }
        }
      }
      let newBoard = Object.assign([], this.board)
      this.onLoad.dispatch(newBoard)
      return newBoard
    }
    return false
  }

  // {i, j}, {i, j} → [{i, j}, {i, j}]
  //                → [empty]
  swap (coordRuneOne, coordRuneTwo) {
    let tmp = this.board[coordRuneOne.i][coordRuneOne.j]
    this.board[coordRuneOne.i][coordRuneOne.j] = this.board[coordRuneTwo.i][coordRuneTwo.j]
    this.board[coordRuneTwo.i][coordRuneTwo.j] = tmp

    this.onSwap.dispatch([ coordRuneOne, coordRuneTwo ])
    return [ coordRuneOne, coordRuneTwo ]
  }

  // () → [{i, j}, ... ,{i, j}]
  //    → [empty]
  drop () {
    let coordRunes = []
    for (let j = 0; j < this.columns; j++) {
      let firstEmpty = null
      for (let i = this.rows - 1; i >= 0; i--) {
        if (firstEmpty === null) {
          if (this.board[i][j].type === 0) {
            firstEmpty = i
          }
        } else {
          if (this.board[i][j].type > 0) {
            this.swap({i: firstEmpty, j: j}, {i: i, j: j})
            coordRunes.push([{i: firstEmpty, j: j}, {i: i, j: j}])
            firstEmpty--
          }
        }
      }
    }
    this.onDrop.dispatch(coordRunes)
    return coordRunes
  }

  // {i, j}, {i, j} → bool
  comparisonType (coordRuneOne, coordRuneTwo) {
    return (this.board[coordRuneOne.i][coordRuneOne.j].type === this.board[coordRuneTwo.i][coordRuneTwo.j].type)
  }

  // {i, j}, {i, j} → bool
  areTheSame (coordRuneOne, coordRuneTwo) {
    return (coordRuneOne.i === coordRuneTwo.i &&
            coordRuneOne.j === coordRuneTwo.j)
  }

  // TODO
  // {i, j}, {i, j} → bool
  isAdjacentRune (coordRuneOne, coordRuneTwo) {
    return (Math.abs(coordRuneTwo.i - coordRuneOne.i) === 1 && Math.abs(coordRuneTwo.j - coordRuneOne.j) === 0) ||
           (Math.abs(coordRuneTwo.i - coordRuneOne.i) === 0 && Math.abs(coordRuneTwo.j - coordRuneOne.j) === 1)
  }

  // () → [{i, j, type}]
  //    → [empty]
  refill () {
    let newRunes = []
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        if (this.board[i][j].type === 0) {
          let newRune = this.board[i][j].newRandomType(this.countGenerateRunes)
          newRunes.push({i: i, j: j, type: newRune})
        }
      }
    }
    this.onRefill.dispatch(newRunes)
    return newRunes
  }
}
