class Board {

  constructor(rows, columns, countGenerateRunes, minMoveCount) {
    this.rows = rows || 6;
    this.columns = columns || 6;
    this.countGenerateRunes = countGenerateRunes || 6;
    this.minMoveCount = minMoveCount || 3;

    this.board = [];
    this.moves = [];
    this.clusters = [];

    this.onLoad = new Phaser.Signal();
    this.preSwap = new Phaser.Signal();
    this.onSwap = new Phaser.Signal();
    this.onFindMove = new Phaser.Signal();
    this.onFindMoves = new Phaser.Signal();
    this.onFindCluster = new Phaser.Signal();
    this.onFindClusters = new Phaser.Signal();
    this.onDrop = new Phaser.Signal();
  }

  load(savedBoard) {
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
      this.onLoad.dispatch(this.board);
      return this.board;
    } 
    else {
      this.onLoad.dispatch(false);
      return false;
    }
  }

  // swap ( {i:0, j:0}, {i:1, j:1} )
  swap(coordRuneOne, coordRuneTwo) {
    this.preSwap.dispatch([coordRuneOne, coordRuneTwo]);

    let tmp = this.board[coordRuneOne.i][coordRuneOne.j];
    this.board[coordRuneOne.i][coordRuneOne.j] = this.board[coordRuneTwo.i][coordRuneTwo.j]
    this.board[coordRuneTwo.i][coordRuneTwo.j] = tmp;

    this.onSwap.dispatch([coordRuneOne, coordRuneTwo]);
    return [ coordRuneOne, coordRuneTwo ];
  }

  findMoves() {
    this.moves = [];
    // HORIZONT
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns-1; j++) {
        this.swap({i:i, j:j}, {i:i, j:j+1});
        this.findClusters();
        if (this.clusters.length > 0) {
          let objCoordMove = [{i:i, j:j}, {i:i, j:j+1}];
          this.onFindMove.dispatch( objCoordMove );
          this.moves.push( objCoordMove );
        }
        this.swap({i:i, j:j}, {i:i, j:j+1});
      }
    }
    // VERTICAL
    for (let i = 0; i < this.rows-1; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.swap({i:i, j:j}, {i:i+1, j:j});
        this.findClusters();
        if (this.clusters.length > 0) {
          let objCoordMove = [{i:i, j:j}, {i:i+1, j:j}];
          this.onFindMove.dispatch( objCoordMove );
          this.moves.push( objCoordMove );
        }
        this.swap({i:i, j:j}, {i:i+1, j:j});
      }
    }

    this.onFindMoves.dispatch( this.moves );
    return this.moves;
  }

  findClusters() {
    this.clusters = [];
    // HORIZONT
    for (let i = 0; i < this.rows; i++) {
      let firstRuneInCluster = 0;
      let clusterLength = 1;
      for (let j = 1; j < this.columns; j++) {
        let isRecord = false;
        if (this.board[i][firstRuneInCluster].type === this.board[i][j].type && this.board[i][firstRuneInCluster].type>0) {
          clusterLength++; 
          if (j+1 === this.columns) isRecord = true;
        } 
        else isRecord = true;

        if (isRecord) {
          if (clusterLength >= 3) {
            let objCoordCluster = [{i:i, j:firstRuneInCluster}, {i:i, j:clusterLength+firstRuneInCluster-1}];
            this.onFindCluster.dispatch( objCoordCluster );
            this.clusters.push( objCoordCluster );
          }
          firstRuneInCluster = j;
          clusterLength = 1;
        }
      }
    }
    // VERTICAL
    for (let i = 0; i < this.columns; i++) {
      let firstRuneInCluster = 0;
      let clusterLength = 1;
      for (let j = 1; j < this.rows; j++) {
        let isRecord = false;
        if (this.board[firstRuneInCluster][i].type === this.board[j][i].type && this.board[firstRuneInCluster][i].type>0) {
          clusterLength++; 
          if (j+1 === this.columns) isRecord = true;
        }
        else isRecord = true;

        if (isRecord) {
          if (clusterLength >= 3) {
            let objCoordCluster = [{i:firstRuneInCluster, j:i}, {i:clusterLength+firstRuneInCluster-1, j:i}];
            this.onFindCluster.dispatch( objCoordCluster );
            this.clusters.push( objCoordCluster );
          }
          firstRuneInCluster = j;
          clusterLength = 1;
        }
      }
    }
    
    this.onFindClusters.dispatch( this.clusters );
    return this.clusters;
  }
};

/*
СЛЕВА НА ПРАВО + СВЕРХУ ВНИЗ
for (let i = 0; i < this.rows; i++) {
  for (let j = 0; j < this.columns; j++) {
    new Rune();
  }
}

СЛЕВА НА ПРАВО + СНИЗУ ВВЕРХ
for (let i = this.rows-1; i > 0; i--) {
  for (let j = 0; j < this.columns; j++) {
    new Rune();
  }
}

*/
