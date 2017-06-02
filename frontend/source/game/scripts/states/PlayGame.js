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
    view.renderBoard(board.board, textureRune);

    board.findClusters();
    board.findMoves();
    //var qwww = board.swapRune({i:0, j:0}, {i:3, j:1});
    //view.renderSwapRune(qwww[0],qwww[1]);
    //view.renderBoard(board.board, textureRune);


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