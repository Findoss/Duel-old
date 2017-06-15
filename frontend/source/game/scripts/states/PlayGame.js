class PlayGame extends Phaser.State {

  init() {
    this.game.time.advancedTiming = true;
    this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
    console.log("param = "+param.key);
  }

  preload() {
    for (let i = 0; i < 6; i++) {
      this.game.load.spritesheet(textureRune.fileName+i, texturePath+textureRune.fileName+i+".png", textureRune.size.width, textureRune.size.height, 12);
    }
  }

  create() {
    let testBoard = testBoard_5;

    var board = new Board();
    var view = new View(this);
    var debug = new Debug(board, view);

    // бинды на события
    board.onLoad.add(function (board) {
      queue.add(view, "renderBoard", [board, textureRune, true, 10, 100]);
    });

    board.onSwap.add(function (coordRunes) {
      queue.add(view, "renderSwap", [coordRunes[0], coordRunes[1]]);
    });

    board.onDeleteClusters.add(function (toDel) {
      queue.add(view, "renderDel", [toDel]);
    });

    board.onRefill.add(function (toFill) {
      queue.add(view, "renderRefill", [toFill, textureRune]);
    });

    board.load(testBoard);

    let qwe = 0;
    do {
      qwe++;
      if (board.findClusters().length) {
        do {
          board.findClusters();
          board.deleteClusters();
          board.drop();
          board.refill();
        } while (board.findClusters().length)
      } 
      else {
        if (board.findMoves().length) {
          board.swap(board.moves[0][0],board.moves[0][1]);
        }
        else {
          board.load(testBoard);
        }
      }
    } while (qwe<1000)


    //window.setTimeout(function() {

    //},
    //20);

    //window.setTimeout(function() {

    //},
    //2500);


  }

  update() {
    utils.resizeGame(this.game);
  }

  render() {
    DEBUG && this.game.debug.text("FPS: " + this.game.time.fps, 20, 50, DEBUG_color, DEBUG_font);
    DEBUG && this.game.debug.text("Q: " + queue.queue.length, 150, 50, DEBUG_color, DEBUG_font);
  }

  runeClick(rune, param, coord) {
    console.log(coord);
  }
}