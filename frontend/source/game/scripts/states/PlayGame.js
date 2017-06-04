class PlayGame extends Phaser.State {

  init() {
    //
    this.game.time.advancedTiming = true;
    //
    this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
    //
    console.log("param = "+param.key);
  }

  preload() {
    // загрузка текстур рун
    for (let i = 0; i < 6; i++) {
      this.game.load.spritesheet(textureRune.fileName+i, texturePath+textureRune.fileName+i+".png", textureRune.size.width, textureRune.size.height, 12);
    }
  }

  create() {
    let testBoard = testBoard_5;

    var board = new Board();
    var view = new View(this);
    board.load(testBoard);
    view.renderBoard(board.board, textureRune, false);

    var board2 = new Board();
    var view2 = new View(this);
    var debug = new Debug(board2, view2);

    board2.load(testBoard);
    view.renderBoard(board2.board, textureRune, true, 10, 900);

    board2.swap({i:2, j:4},{i:3, j:4});
    debug.test("swap", testBoard_5_swap);

    while (board2.findClusters().length) {
      board2.deleteClusters();
      debug.test("del", testBoard_5_del);
      board2.drop();
      debug.test("drop", testBoard_5_drop);
    }
    debug.test("drop_2", testBoard_5_drop_2);
    
    //board2.fill();
    view.renderBoard(board2.board, textureRune, true, 10, 900);
    

  }

  update() {
    utils.resizeGame(this.game);
  }

  render() {
    DEBUG && this.game.debug.text('FPS: ' + this.game.time.fps || 'FPS: --', 20, 50, DEBUG_color, DEBUG_font);
  }

  runeClick(rune, param, coord) {
    console.log(coord);
  }
}