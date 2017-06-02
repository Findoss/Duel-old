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
*/

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


  }

}


