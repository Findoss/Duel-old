const DEBUG = true;
const DEBUG_font = "30px Arial";
const DEBUG_color = "#00ff00";

class Debug {

  constructor(board, view) {
    this.linkBoard = board;
    this.linkView = view; 

/*
    this.linkBoard.onLoad.add(function (argument) {
      console.log("board.onLoad");
      console.log(argument);
    }, this);


    this.linkBoard.preSwap.add(function (argument) {
      console.log("board.preSwap");
      console.log(argument);
    }, this);

    this.linkBoard.onSwap.add(function (argument) {
      console.log("board.onSwap");
      console.log(argument);
    }, this);

    this.linkBoard.onFindClusters.add(function (argument) {
      if (argument.length) {
        console.log("board.onFindClusters");
        console.log(argument);
      }
    }, this);

    this.linkBoard.onFindMoves.add(function (argument) {
      console.log("board.onFindMoves");
      console.log(argument);
    }, this);

    this.linkBoard.onDrop.add(function (argument) {
      console.log("board.onDrop");
      console.log(argument);
    }, this);

    this.linkBoard.onDeleteClusters.add(function (argument) {
      console.log("board.onDeleteClusters");
      console.log(argument);
    }, this);
*/
  }

  test(name, savedBoard) {
    console.log(name+" test = " + this.comparisonBoards(savedBoard));
  }

  comparisonBoards(savedBoard) {
    for (let i = 0; i < savedBoard.length; i++) {
      for (let j = 0; j < savedBoard[i].length; j++) {
        if (savedBoard[i][j] != this.linkBoard.board[i][j].type) {
          return false
        }
      }
    }
    return true
  }

  boardConsole() {
    let tmpStr = "";
    for (let i = 0; i < this.linkBoard.rows; i++) {
      for (let j = 0; j < this.linkBoard.columns; j++) {
        tmpStr += this.linkBoard.board[i][j].type+" ";
      }
      console.log("["+tmpStr+"],\n");
      tmpStr = "";
    }
    console.log("\n");
  }

  boardViewConsole() {
    let tmpStr = "";
    for (let i = 0; i < this.linkView.board.length; i++) {
      for (let j = 0; j < this.linkView.board[i].length; j++) {
        tmpStr += this.linkView.board[i][j].key[this.linkView.board[i][j].key.length-1]+" ";
      }
      console.log("["+tmpStr+"],\n");
      tmpStr = "";
    }
    console.log("\n");
  }


}


