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
  constructor (rows = 6, columns = 6, countGenerateRunes = 5, minMoveCount = 3) {
    this.rows = rows || 6
    this.columns = columns || 6
    this.countGenerateRunes = countGenerateRunes || 5
    this.minMoveCount = minMoveCount || 3

    this.board = []
    this.moves = []
    this.clusters = []
    this.countRunes = {}

    this.onDeleteBoard = new Phaser.Signal()
    this.onLoad = new Phaser.Signal()
    this.preSwap = new Phaser.Signal()
    this.onSwap = new Phaser.Signal()
    this.onDrop = new Phaser.Signal()
    this.onRefill = new Phaser.Signal()
    this.onDeleteClusters = new Phaser.Signal()
    this.onFindClusters = new Phaser.Signal()
    this.onFindMoves = new Phaser.Signal()
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
    this.cleanMoves()
    this.cleanClusters()
    this.board = []
    this.onDeleteBoard.dispatch()
    return true
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
          if (savedBoard[i][j] < 0 || savedBoard[i][j] > this.countGenerateRunes) {
            return false
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
    this.onSwap.dispatch([coordRuneOne, coordRuneTwo])
    return [coordRuneOne, coordRuneTwo]
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
            this.swap({i, j}, {i: firstEmpty, j: j})
            coordRunes.push([{i, j}, {i: firstEmpty, j: j}])
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
      if (this.everyComparisonType(true, {i, j}, {i: i - 1, j: j}, {i: i - 2, j: j})) {
        return true
      }
    }
    if (j > 1) {
      if (this.everyComparisonType(true, {i, j}, {i: i, j: j - 1}, {i: i, j: j - 2})) {
        return true
      }
    }
    return false
  }

  /**
   * [findHorizontalClusters description]
   * @param  {number} i row
   * @param  {number} j column
   * @return {array} cluster empty
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
   * @return {array} cluster or empty
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

  findClusters (coordRune) {
    // H
    for (let l = 0; l < this.columns - 2; l++) {
      let cluster = this.findHorizontalClusters(coordRune.i, l)
      if (cluster.length > 2) {
        this.clusters.push(cluster)
        l += cluster.length - 1
      }
    }
    // V
    for (let l = 0; l < this.rows - 2; l++) {
      let cluster = this.findVerticalClusters(l, coordRune.j)
      if (cluster.length > 2) {
        this.clusters.push(cluster)
        l += cluster.length - 1
      }
    }
    return this.clusters
  }

  findAllClusters () {
    for (let l = 0; l < this.rows; l++) {
      this.findClusters({i: l, j: l})
    }
    this.onFindClusters.dispatch(this.clusters)
    return this.clusters
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
          newRunes.push({i, j, type: newRune})
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
    do {
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
    }
    while (this.findMoves() < this.minMoveCount)
    this.cleanMoves()
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
   * [comparisonType description]
   * @param  {{i, j}} coordRuneOne
   * @param  {{i, j}} coordRuneTwo
   * @return {bool}
   */
  comparisonType (coordRuneOne, coordRuneTwo) {
    if (
      (coordRuneOne.i >= 0) &&
      (coordRuneTwo.i >= 0) &&
      (coordRuneOne.j >= 0) &&
      (coordRuneTwo.j >= 0) &&
      (coordRuneOne.i < this.rows) &&
      (coordRuneTwo.i < this.rows) &&
      (coordRuneOne.j < this.columns) &&
      (coordRuneTwo.j < this.columns)) {
      return (this.board[coordRuneOne.i][coordRuneOne.j].type === this.board[coordRuneTwo.i][coordRuneTwo.j].type)
    }
  }

  everyComparisonType (flag, coordRune, ...coordRunes) {
    for (let l = 0; l < coordRunes.length; l++) {
      if ((coordRunes[l].i < 0) || (coordRunes[l].i > this.columns) || (coordRunes[l].j < 0) || (coordRunes[l].j > this.rows)) return false
      if (flag ^ this.comparisonType(coordRune, coordRunes[l])) {
        return false
      }
    }
    return true
  }

  // TODO RESERV
  someComparisonType (coordRune, ...coordRunes) {
    for (let l = 0; l < coordRunes.length; l++) {
      if ((coordRunes[l].i >= 0) && (coordRunes[l].i < this.columns) && (coordRunes[l].j >= 0) && (coordRunes[l].j < this.rows)) {
        if (this.comparisonType(coordRune, coordRunes[l])) {
          return coordRunes[l]
        }
      }
    }
    return false
  }

  // TODO
  cleanClusters () {
    this.clusters = []
  }

  // TODO
  cleanCountRunes () {
    this.countRunes = []
  }

  // TODO
  cleanMoves () {
    this.moves = []
  }

  // TODO
  findMoves () {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        let coordRuneS = {}
        let coordRuneOne = {i, j}

        /*    x     x
        *   x - 1 2 - x
        *     x     x
        */
        let coordRuneTwo = {i: i, j: j + 1}
        if (this.comparisonType(coordRuneOne, coordRuneTwo)) {
          coordRuneS = {i: i, j: j + 2}
          coordRuneTwo = {i: i - 1, j: j + 2}
          if (this.comparisonType(coordRuneOne, coordRuneTwo)) this.moves.push({a: coordRuneS, b: coordRuneTwo})
          coordRuneTwo = {i: i, j: j + 3}
          if (this.comparisonType(coordRuneOne, coordRuneTwo)) this.moves.push({a: coordRuneS, b: coordRuneTwo})
          coordRuneTwo = {i: i + 1, j: j + 2}
          if (this.comparisonType(coordRuneOne, coordRuneTwo)) this.moves.push({a: coordRuneS, b: coordRuneTwo})

          coordRuneS = {i: i, j: j - 1}
          coordRuneTwo = {i: i - 1, j: j - 1}
          if (this.comparisonType(coordRuneOne, coordRuneTwo)) this.moves.push({a: coordRuneS, b: coordRuneTwo})
          coordRuneTwo = {i: i, j: j - 2}
          if (this.comparisonType(coordRuneOne, coordRuneTwo)) this.moves.push({a: coordRuneS, b: coordRuneTwo})
          coordRuneTwo = {i: i + 1, j: j - 1}
          if (this.comparisonType(coordRuneOne, coordRuneTwo)) this.moves.push({a: coordRuneS, b: coordRuneTwo})
        }

        /*      x
        *     x - x
        *       1
        *       2
        *     x - x
        *       x
        */
        coordRuneTwo = {i: i + 1, j: j}
        if (this.comparisonType(coordRuneOne, coordRuneTwo)) {
          coordRuneS = {i: i + 2, j: j}
          coordRuneTwo = {i: i + 2, j: j - 1}
          if (this.comparisonType(coordRuneOne, coordRuneTwo)) this.moves.push({a: coordRuneS, b: coordRuneTwo})
          coordRuneTwo = {i: i + 3, j: j}
          if (this.comparisonType(coordRuneOne, coordRuneTwo)) this.moves.push({a: coordRuneS, b: coordRuneTwo})
          coordRuneTwo = {i: i + 2, j: j + 1}
          if (this.comparisonType(coordRuneOne, coordRuneTwo)) this.moves.push({a: coordRuneS, b: coordRuneTwo})

          coordRuneS = {i: i - 1, j: j}
          coordRuneTwo = {i: i - 1, j: j - 1}
          if (this.comparisonType(coordRuneOne, coordRuneTwo)) this.moves.push({a: coordRuneS, b: coordRuneTwo})
          coordRuneTwo = {i: i - 2, j: j}
          if (this.comparisonType(coordRuneOne, coordRuneTwo)) this.moves.push({a: coordRuneS, b: coordRuneTwo})
          coordRuneTwo = {i: i - 1, j: j + 1}
          if (this.comparisonType(coordRuneOne, coordRuneTwo)) this.moves.push({a: coordRuneS, b: coordRuneTwo})
        }

        /*      x
        *     1 - 2
        *       x
        */
        coordRuneTwo = {i: i, j: j + 2}
        if (this.comparisonType(coordRuneOne, coordRuneTwo)) {
          coordRuneS = {i: i, j: j + 1}
          coordRuneTwo = {i: i + 1, j: j + 1}
          if (this.comparisonType(coordRuneOne, coordRuneTwo)) this.moves.push({a: coordRuneS, b: coordRuneTwo})
          coordRuneTwo = {i: i - 1, j: j + 1}
          if (this.comparisonType(coordRuneOne, coordRuneTwo)) this.moves.push({a: coordRuneS, b: coordRuneTwo})
        }

         /*      1
         *     x - x
         *       2
         */
        coordRuneTwo = {i: i + 2, j: j}
        if (this.comparisonType(coordRuneOne, coordRuneTwo)) {
          coordRuneS = {i: i + 1, j: j}
          coordRuneTwo = {i: i + 1, j: j - 1}
          if (this.comparisonType(coordRuneOne, coordRuneTwo)) this.moves.push({a: coordRuneS, b: coordRuneTwo})
          coordRuneTwo = {i: i + 1, j: j + 1}
          if (this.comparisonType(coordRuneOne, coordRuneTwo)) this.moves.push({a: coordRuneS, b: coordRuneTwo})
        }
      }
    }
    let moves = Object.assign([], this.moves)
    this.onFindMoves.dispatch(moves)
    return moves
  }
}
