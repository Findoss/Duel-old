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
      //debug.boardConsole();
      queue.add(view, "renderBoard", [board, textureRune, true, 10, 100]);
    }, this);

    board.onSwap.add(function (coordRunes) {
      queue.add(view, "renderSwap", [coordRunes[0], coordRunes[1]]);
    }, this);

    board.onDeleteClusters.add(function (board) {
      queue.add(view, "renderDel", [board]);
    }, this);

    board.onDrop.add(function (board) {
      //queue.add(view, "renderBoard", []);
    }, this);


    board.load(testBoard);

    setTimeout(function() { /// <- ХУЙНЯ !!!
      board.swap([2,4],[3,4]);
      board.swap([2,4],[3,4]);
      board.swap([2,4],[3,4]);
      board.swap([2,4],[3,4]);
      board.swap([2,4],[3,4]);

      board.findClusters();
      board.deleteClusters();
    }, 1000);

    setTimeout(function() { /// <- ХУЙНЯ !!!
      board.drop();
    }, 3000);

    console.log("testBoard_5_drop = "+debug.comparisonBoards(testBoard_5_drop));

  }

  update() {
    utils.resizeGame(this.game);
    queue.play();
  }

  render() {
    DEBUG && this.game.debug.text("FPS: " + this.game.time.fps, 20, 50, DEBUG_color, DEBUG_font);
    DEBUG && this.game.debug.text("Q: " + queue.queue.length, 150, 50, DEBUG_color, DEBUG_font);
  }

  runeClick(rune, param, coord) {
    console.log(coord);
  }
}