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
    //
    for (var i = 0; i < 6; i++) {
      this.game.load.spritesheet(textureRune.fileName+i, texturePath+textureRune.fileName+i+".png", textureRune.size.width, textureRune.size.height, 12);
    }
  }

  create() {
    //
    var q = new Board();
    q.load(testBoard_1);
    q.viewCreate();

    var w = new Board();
    w.load(testBoard_1);
    w.viewCreate(900);
  }


  update() {
    utils.resizeGame(this.game);
  }

  render() {
    DEBUG && this.game.debug.text('FPS: ' + this.game.time.fps || 'FPS: --', 20, 50, DEBUG_color, DEBUG_font);
    /*
    game.debug.inputInfo(32, 32);
    game.debug.spriteInputInfo(sprite, 32, 130);
    game.debug.pointer( game.input.activePointer );*/
  }
 
}