/* global Phaser, Rune */

class Board {
  /**
   * [constructor description]
   * @param  {number} rows
   * @param  {number} columns
   * @param  {number} countGenerateRunes
   * @param  {number} minMoveCount
   * @return {array
   */
  constructor (rows, columns, countGenerateRunes, minMoveCount) {
    this.rows = rows || 6
    this.columns = columns || 6
    this.countGenerateRunes = countGenerateRunes || 5
    this.minMoveCount = minMoveCount || 3

    this.board = []
    this.moves = []
    this.clusters = []
    this.countRunes = {}

    this.onDelete = new Phaser.Signal()
    this.onLoad = new Phaser.Signal()
    this.preSwap = new Phaser.Signal()
    this.onSwap = new Phaser.Signal()
    this.onDrop = new Phaser.Signal()
    this.onRefill = new Phaser.Signal()
    this.onDeleteClusters = new Phaser.Signal()
    this.onFindClusters = new Phaser.Signal()
    this.onLoop = new Phaser.Signal()
  }

  /**
   * [getColumn description]
   * @param  {number} index
   * @return {array} column
   */
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

  /**
   * [getRow description]
   * @param  {numder} index
   * @return {array} row
   */
  getRow (index) {
    return this.board[index]
  }

  /**
   * [deleteBoard description]
   * @return {bool}
   */
  deleteBoard () {
    if (this.board !== undefined) {
      delete this.board
      this.onLoad.dispatch()
      return true
    }
    return false
  }

  /**
   * [validatorSavedBoard description]
   * @param  {array} savedBoard
   * @return {bool}
   */
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

  /**
   * [loadBoard description]
   * @param  {array} savedBoard
   * @return {array} copy array or empty
   */
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
    return []
  }

  /**
   * [swap description]
   * @param  {{i, j}} coordRuneOne
   * @param  {{i, j}} coordRuneTwo
   * @return {array} coordRunes or empty
   */
  swap (coordRuneOne, coordRuneTwo) {
    let tmp = this.board[coordRuneOne.i][coordRuneOne.j]
    this.board[coordRuneOne.i][coordRuneOne.j] = this.board[coordRuneTwo.i][coordRuneTwo.j]
    this.board[coordRuneTwo.i][coordRuneTwo.j] = tmp
    return [ coordRuneOne, coordRuneTwo ]
  }

  /**
   * [swapRune description]
   * @param  {{i, j}} coordRuneOne
   * @param  {{i, j}} coordRuneTwo
   * @return {array} coordRunes or empty
   */
  swapRune (coordRuneOne, coordRuneTwo) {
    this.preSwap.dispatch([coordRuneOne, coordRuneTwo])
    this.swap(coordRuneOne, coordRuneTwo)
    // this.onSwap.dispatch(result)
    this.findClusters(coordRuneOne.i, coordRuneOne.j)
    this.findClusters(coordRuneTwo.i, coordRuneTwo.j)
    return this.clusters
  }

  /**
   * [drop description]
   * @return {array} coordRunes or empty
   */
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

  /**
   * [isRuneInCluster description]
   * @param  {number} i row
   * @param  {number} j column
   * @return {bool}
   */
  isRuneInCluster (i, j) {
    if (i > 1) {
      if (this.comparisonType({i: i, j: j}, {i: i - 1, j: j}) &&
          this.comparisonType({i: i, j: j}, {i: i - 2, j: j})) {
        return true
      }
    }
    if (j > 1) {
      if (this.comparisonType({i: i, j: j}, {i: i, j: j - 1}) &&
          this.comparisonType({i: i, j: j}, {i: i, j: j - 2})) {
        return true
      }
    }
    return false
  }

  /**
   * [findHorizontalClusters description]
   * @param  {number} i row
   * @param  {number} j column
   * @return {array} cluster
   */
  findHorizontalClusters (i, j) {
    let cluster = []
    cluster.push({i: i, j: j})
    for (let l = 1; j + l < this.columns; l++) {
      if (this.comparisonType(cluster[0], {i: i, j: j + l})) {
        cluster.push({i: i, j: j + l})
      } else {
        return cluster
      }
    }
    return cluster
  }

  /**
   * [findVerticalClusters description]
   * @param  {number} i row
   * @param  {number} j column
   * @return {array} cluster
   */
  findVerticalClusters (i, j) {
    let cluster = []
    cluster.push({i: i, j: j})
    for (let l = 1; i + l < this.rows; l++) {
      if (this.comparisonType(cluster[0], {i: i + l, j: j})) {
        cluster.push({i: i + l, j: j})
      } else {
        return cluster
      }
    }
    return cluster
  }

  /**
   * [findClusters description]
   * @param  {number} i
   * @param  {number} j
   * @return {array} cluster
   */
  findClusters (i, j) {
    // H
    for (let l = 0; l < this.columns - 2; l++) {
      let cluster = this.findHorizontalClusters(i, l)
      if (cluster.length > 2) {
        this.clusters.push(cluster)
        l += cluster.length - 1
      }
    }
    // V
    for (let l = 0; l < this.rows - 2; l++) {
      let cluster = this.findVerticalClusters(l, j)
      if (cluster.length > 2) {
        this.clusters.push(cluster)
        l += cluster.length - 1
      }
    }
    return this.clusters
  }

  /**
   * [findAllClusters description]
   * @return {array} clusters
   */
  findAllClusters () {
    for (let l = 0; l < this.rows; l++) {
      this.findClusters(l, l)
    }
    this.onFindClusters.dispatch(this.clusters)
    return this.clusters
  }

  /**
   * [isAdjacentRune description]
   * @param  {{i, j}} coordRuneOne
   * @param  {{i, j}} coordRuneTwo
   * @return {bool}
   */
  isAdjacentRune (coordRuneOne, coordRuneTwo) {
    return (Math.abs(coordRuneTwo.i - coordRuneOne.i) === 1 && Math.abs(coordRuneTwo.j - coordRuneOne.j) === 0) ||
           (Math.abs(coordRuneTwo.i - coordRuneOne.i) === 0 && Math.abs(coordRuneTwo.j - coordRuneOne.j) === 1)
  }

  /**
   * [comparisonType description]
   * @param  {{i, j}} coordRuneOne
   * @param  {{i, j}} coordRuneTwo
   * @return {bool}
   */
  comparisonType (coordRuneOne, coordRuneTwo) {
    return (this.board[coordRuneOne.i][coordRuneOne.j].type === this.board[coordRuneTwo.i][coordRuneTwo.j].type)
  }

  /**
   * [multipleComparison description]
   * @param  {{i, j}} coordRune
   * @param  {array} coordRunes
   * @return {bool}
   */
  multipleComparisonType (coordRune, coordRunes) {
    for (let i = 0; i < coordRunes.length; i++) {
      if (true) {}
      if (this.comparisonType(coordRune, coordRunes[i])) {
        return false
      }
    }
    return true
  }

  /**
   * [areTheSame description]
   * @param  {{i, j}} coordRuneOne
   * @param  {{i, j}} coordRuneTwo
   * @return {bool}
   */
  areTheSame (coordRuneOne, coordRuneTwo) {
    return (coordRuneOne.i === coordRuneTwo.i &&
            coordRuneOne.j === coordRuneTwo.j)
  }

  /**
   * [refill description]
   * @return {array} coordRunes and type or empty
   */
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

  /**
   * [generation description]
   * @param  {bool} isClusters - false (no clusters at the start)
   * @return {array} copy array or empty
   */
  generation (isClusters) {
    // do {
    for (let i = 0; i < this.rows; i++) {
      this.board[i] = []
      for (let j = 0; j < this.columns; j++) {
        this.board[i][j] = new Rune(0)
        do {
          this.board[i][j].newRandomType(this.countGenerateRunes)
        }
        while (this.isRuneInCluster(i, j) && !isClusters)
      }
    }
    // }
    // while (this.findMoves() < this.minMoveCount)
    let newBoard = Object.assign([], this.board)
    this.onLoad.dispatch(newBoard)
    return newBoard
  }

  /**
   * [deleteClusters description]
   * @return {array} countTypeRunes
   * @return {array} coordRunes
   */
  deleteClusters () {
    let coordRunes = []
    for (let l = 0; l < this.clusters.length; l++) {
      for (let t = 0; t < this.clusters[l].length; t++) {
        if (this.board[this.clusters[l][t].i][this.clusters[l][t].j].type > 0) {
          this.addTypesRune(this.board[this.clusters[l][t].i][this.clusters[l][t].j].type)
          coordRunes.push({i: this.clusters[l][t].i, j: this.clusters[l][t].j})
          this.board[this.clusters[l][t].i][this.clusters[l][t].j].newType(0)
        }
      }
    }
    this.cleanClusters()
    this.onDeleteClusters.dispatch(coordRunes)
    return this.countRunes
  }

  /**
   * [addcountRunes description]
   * @param {array} count type
   */
  addTypesRune (type) {
    if (this.countRunes[type] === undefined) {
      this.countRunes[type] = 1
    } else {
      this.countRunes[type]++
    }
    return this.countRunes
  }

  // TODO
  cleanClusters () {
    this.clusters = []
  }

  // TODO
  cleancountRunes () {
    this.countRunes = []
  }

  // TODO
  loop () {
    let countRunes
    do {
      countRunes = this.deleteClusters()
      this.drop()
      this.refill()
    } while (this.findAllClusters().length)
    this.onLoop.dispatch(countRunes)
    return countRunes
  }

  // TODO
  findMoves () {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.board[i][j]
      }
    }
  }
}
