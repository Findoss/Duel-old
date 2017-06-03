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
    //
    var board = new Board();
    var view = new View(this);
    DEBUG && new Debug(board);

    board.load(testBoard_1);
    view.renderBoard(board.board, textureRune, true, 10, 900);

    var qwe = board.swap({i:0, j:0}, {i:5, j:3});
    view.renderSwapRune(qwe[0], qwe[1]);
    //board.drop();
    //console.log("drop = " + comparisonBoard(testBoard_1_drop, board.board));


    var board2 = new Board();
    var view2 = new View(this);
    board2.load(testBoard_1);
    view2.renderBoard(board2.board, textureRune, false);

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