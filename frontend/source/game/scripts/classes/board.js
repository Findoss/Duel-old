class Board {

  constructor(rows, columns, countGenerateRunes, minMoveCount) {

    this.rows = rows || 6;
    this.columns = columns || 6;
    this.countGenerateRunes = countGenerateRunes || 6;
    this.minMoveCount = minMoveCount || 3;

    this.board = [];
    this.moves = [];
    this.clusters = [];

    // signal
  }

  load(savedBoard, /*isRendering*/) {
    if (savedBoard.length && savedBoard[0].length) {
      this.board.length = 0;
      this.rows = savedBoard.length;
      this.columns = savedBoard[0].length;
      for (let i = 0; i < this.rows; i++) {
        this.board[i] = [];
        for (let j = 0; j < this.columns; j++) {
          this.board[i][j] = new Rune(savedBoard[i][j]);
        }
      }
      return this.board;
    } 
    else return false;
  }

  generation() {
    /*do {
      for (let i = 0; i < this.rows; i++) {
        this.board[i] = [];
        for (let j = 0; j < this.columns; j++) {
          do {
            newRune = randomIntegers(this.countRunes)+1;
          }
          while (this.isRuneInClusters(i, j, newRune) && !isClusters)
          this.board[i][j] = { type: newRune, sprite: null }
        }
      }
    }
    while (this.findMoves() < this.minMoveCount);*/
  }

};

/*
for (let i = 0; i < this.rows; i++) {
  for (let j = 0; j < this.columns; j++) {
    new Rune();
  }
}
*/