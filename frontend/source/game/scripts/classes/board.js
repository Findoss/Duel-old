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
    this.onDeleteClusters = new Phaser.Signal()
    this.onFindClusters = new Phaser.Signal()
    this.onLoop = new Phaser.Signal()
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
          this.board[i][j] = new Rune(savedBoard[i][j])
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
    return [ coordRuneOne, coordRuneTwo ]
  }

  // {i, j}, {i, j} → [{i, j}, {i, j}]
  //                → [empty]
  swapRune (coordRuneOne, coordRuneTwo) {
    let result = this.swap(coordRuneOne, coordRuneTwo)
    this.onSwap.dispatch(result)
    return result
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
            this.swap({i: i, j: j}, {i: firstEmpty, j: j})
            coordRunes.push([{i: i, j: j}, {i: firstEmpty, j: j}])
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

  //
  generation (isClusters) {
    // do {
    for (let i = 0; i < this.rows; i++) {
      this.board[i] = []
      for (let j = 0; j < this.columns; j++) {
        let newRune
        this.board[i][j] = new Rune(0)
        do {
          newRune = this.board[i][j].newRandomType(this.countGenerateRunes)
        }
        while (this.isRuneInClusters(i, j, newRune) && !isClusters)
      }
    }
    // }
    // while (this.findMoves() < this.minMoveCount)
    let newBoard = Object.assign([], this.board)
    this.onLoad.dispatch(newBoard)
    return newBoard
  }

  loop () {
    do {
      this.deleteClusters()
      this.drop()
      this.refill()
    } while (this.findClusters().length)
    this.onLoop.dispatch()
  }

  // TODO ПЕРЕОСМЫСЛИТЬ - надо в соответствие с патернами
  // {i, j}, {i, j} → bool
  isAdjacentRune (coordRuneOne, coordRuneTwo) {
    return (Math.abs(coordRuneTwo.i - coordRuneOne.i) === 1 && Math.abs(coordRuneTwo.j - coordRuneOne.j) === 0) ||
           (Math.abs(coordRuneTwo.i - coordRuneOne.i) === 0 && Math.abs(coordRuneTwo.j - coordRuneOne.j) === 1)
  }

  // TODO ПЕРЕОСМЫСЛИТЬ - надо в соответствие с патернами
  isRuneInClusters (i, j, type) {
    return (i > 1 && type === this.board[i - 1][j].type && type === this.board[i - 2][j].type) ||
           (j > 1 && type === this.board[i][j - 1].type && type === this.board[i][j - 2].type)
  }

  // TODO ПЕРЕОСМЫСЛИТЬ - надо удалять эту магию
  deleteClusters () {
    let delRunes = []
    for (let l = 0; l < this.clusters.length; l++) {
      let i = this.clusters[l][0].i
      let j = this.clusters[l][0].j
      let countCluster = (this.clusters[l][1].j - j) + (this.clusters[l][1].i - i) + 1
      // HORIZONT
      if (this.clusters[l][0].i === this.clusters[l][1].i) {
        for (let t = j; t < j + countCluster; t++) {
          if (this.board[i][t].type > 0) this.board[i][t].type = 0
          delRunes.push({i: i, j: t})
        }
      } else {
        for (let t = i; t < i + countCluster; t++) {
          if (this.board[t][j].type > 0) this.board[t][j].type = 0
          delRunes.push({i: t, j: j})
        }
      }
    }
    this.clusters = []
    // console.log(delRunes)
    this.onDeleteClusters.dispatch(delRunes)
    return delRunes
  }

  // TODO ПЕРЕОСМЫСЛИТЬ - надо удалять эту магию
  findClusters () {
    this.clusters = []
  // HORIZONT
    for (let i = 0; i < this.rows; i++) {
      let firstRuneInCluster = 0
      let clusterLength = 1
      for (let j = 1; j < this.columns; j++) {
        let isRecord = false
        if (this.board[i][firstRuneInCluster].type === this.board[i][j].type && this.board[i][firstRuneInCluster].type > 0) {
          clusterLength++
          if (j + 1 === this.columns) isRecord = true
        } else isRecord = true

        if (isRecord) {
          if (clusterLength >= 3) {
            let objCoordCluster = [{i: i, j: firstRuneInCluster}, {i: i, j: clusterLength + firstRuneInCluster - 1}]
            this.clusters.push(objCoordCluster)
          }
          firstRuneInCluster = j
          clusterLength = 1
        }
      }
    }
  // VERTICAL
    for (let i = 0; i < this.columns; i++) {
      let firstRuneInCluster = 0
      let clusterLength = 1
      for (let j = 1; j < this.rows; j++) {
        let isRecord = false
        if (this.board[firstRuneInCluster][i].type === this.board[j][i].type && this.board[firstRuneInCluster][i].type > 0) {
          clusterLength++
          if (j + 1 === this.columns) isRecord = true
        } else isRecord = true

        if (isRecord) {
          if (clusterLength >= 3) {
            let objCoordCluster = [{i: firstRuneInCluster, j: i}, {i: clusterLength + firstRuneInCluster - 1, j: i}]
            this.clusters.push(objCoordCluster)
          }
          firstRuneInCluster = j
          clusterLength = 1
        }
      }
    }

    this.onFindClusters.dispatch(this.clusters)
    return this.clusters
  }
}
