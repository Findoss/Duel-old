class Board {

  constructor(rows, columns, countGenerateRunes, minMoveCount) {
    this.rows = rows || 6;
    this.columns = columns || 6;
    this.countGenerateRunes = countGenerateRunes || 6;
    this.minMoveCount = minMoveCount || 3;

    this.board = [];
    this.moves = [];
    this.clusters = [];
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


  load(savedBoard) {
    this.board.length = 0;
    this.rows = savedBoard.length;
    this.columns = savedBoard[0].length;
    for (let i = 0; i < this.rows; i++) {
      this.board[i] = [];
      for (let j = 0; j < this.columns; j++) {
        this.board[i][j] = new Rune(savedBoard[i][j]);
      }
    }
  }

  viewCreate(configSpriteRune, marginBoardX, marginBoardY, marginRune) {
    this.marginBoardX = marginBoardX || 150;
    this.marginBoardY = marginBoardY || 150;
    this.marginRune = marginRune || textureRune.size.width/10;
    if (this.board) {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.board[i][j].viewCreate(
            this.marginBoardX + j * (textureRune.size.width+ this.marginRune),
            this.marginBoardY + i * (textureRune.size.height + this.marginRune),
            configSpriteRune,
            true,
            true
          );
        }
      }
    }
  }
};

/*
for (let i = 0; i < this.rows; i++) {
  for (let j = 0; j < this.columns; j++) {
    new Rune();
  }
}
*/