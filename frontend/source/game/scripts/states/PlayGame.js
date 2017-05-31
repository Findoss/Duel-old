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

    board.load(testBoard_1);
    var qwe = view.renderBoard(board.board, textureRune, 10, 150, 150);
    console.log(qwe);
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