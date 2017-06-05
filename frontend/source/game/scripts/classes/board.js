class Board {

  constructor(rows, columns, countGenerateRunes, minMoveCount) {
    this.rows = rows || 6;
    this.columns = columns || 6;
    this.countGenerateRunes = countGenerateRunes || 5;
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
    this.onDeleteClusters = new Phaser.Signal();
    this.onFill = new Phaser.Signal();
  }

  getColumn(index) {
    let column = [];
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        if (j === index) {
          column.push(this.board[i][j]);
          break;
        }
      }
    }
    return column
  }

  getRow(index) {
    return this.board[index];
  }

  load(savedBoard) {
    if (savedBoard.length & savedBoard[0].length) {
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

  // swap ( arr[i,j], arr[i,j] )
  swap(coordRuneOne, coordRuneTwo) {

    this.preSwap.dispatch([coordRuneOne, coordRuneTwo]);

    let tmp = this.board[coordRuneOne[0]][coordRuneOne[1]];
    this.board[coordRuneOne[0]][coordRuneOne[1]] = this.board[coordRuneTwo[0]][coordRuneTwo[1]]
    this.board[coordRuneTwo[0]][coordRuneTwo[1]] = tmp;

    this.onSwap.dispatch([coordRuneOne, coordRuneTwo]);
    return [ coordRuneOne, coordRuneTwo ];
  }

  // TODO ПЕРЕОСМЫСЛИТЬ
  findMoves() {
    this.moves = [];
    // HORIZONT
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns-1; j++) {
        this.swap([i, j], [i, j+1]);
        this.findClusters();
        if (this.clusters.length > 0) {
          let objCoordMove = [{i:i, j:j}, {i:i, j:j+1}];
          this.onFindMove.dispatch( objCoordMove );
          this.moves.push( objCoordMove );
        }
        this.swap([i, j], [i, j+1]);
      }
    }
    // VERTICAL
    for (let i = 0; i < this.rows-1; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.swap([i, j], [i+1, j]);
        this.findClusters();
        if (this.clusters.length > 0) {
          let objCoordMove = [{i:i, j:j}, {i:i+1, j:j}];
          this.onFindMove.dispatch( objCoordMove );
          this.moves.push( objCoordMove );
        }
        this.swap([i, j], [i+1, j]);
      }
    }

    this.onFindMoves.dispatch( this.moves );
    return this.moves;
  }

  // TODO ПЕРЕОСМЫСЛИТЬ
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

  // TODO ПЕРЕОСМЫСЛИТЬ
  deleteClusters() {
    for (let l = 0; l < this.clusters.length; l++) {
      let i = this.clusters[l][0].i;
      let j = this.clusters[l][0].j;
      let countCluster = (this.clusters[l][1].j-j)+(this.clusters[l][1].i-i)+1;
      // HORIZONT
      if (this.clusters[l][0].i == this.clusters[l][1].i) {
        for (let t = j; t < j+countCluster; t++) {
          if (this.board[i][t].type > 0) this.board[i][t].type = 0;
        }
      }
      // VERTICAL
      else {
        for (let t = i; t < i+countCluster; t++) {
          if (this.board[t][j].type > 0) this.board[t][j].type = 0;
        }
      }
    }
    this.clusters = [];
    this.onDeleteClusters.dispatch( "qwer" );
    return "this.onDeleteClusters.dispatch";
  }

  // TODO ПЕРЕОСМЫСЛИТЬ
  fill() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        if (this.board[i][j].type == 0) {
          this.board[i][j].newRandomType(this.countGenerateRunes);
        } 
      }
    }
    this.onFill.dispatch( "qwer" );
    return "this.onFill.dispatch";
  }

  // TODO ПЕРЕОСМЫСЛИТЬ
  drop() {
    for (let j = 0; j < this.columns; j++) {
      let firstEmpty = null;
      for (let i = this.rows-1; i >= 0; i--) {
        if (firstEmpty) {
          if ( this.board[i][j].type == 0 ) {
            firstEmpty = i;
          }
        } else {
          if ( this.board[i][j].type > 0 ) {
            this.swap([firstEmpty, j], [i, j]);
            firstEmpty--;
          }
        }
      }
    }
    this.onDrop.dispatch( "qwer" );
    return "this.onDrop.dispatch";
  }

  /*generation(isClusters = false) {
    do {
      for (var i = 0; i < this.rows; i++) {
        this.board[i] = [];
        for (var j = 0; j < this.columns; j++) {
          do {
            newRune = randomIntegers(this.countRunes)+1;
          }
          while (this.isRuneInClusters(i, j, newRune) && !isClusters)
          this.board[i][j] = { type: newRune, sprite: null }
        }
      }
    }
    while (this.findMoves() < this.minMoveCount);
    return this;
  }*/

  /*
  isRuneInClusters(i, j, type) {
    return ( i>1 && type === this.board[i-1][j].type && type === this.board[i-2][j].type) ||
           ( j>1 && type === this.board[i][j-1].type && type === this.board[i][j-2].type)
  }
  */
};
