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
      this.game.load.spritesheet("sprite_"+i, textureRune.fileName+i+".png", textureRune.size.width, textureRune.size.height, 12);
    }
  }

  create() {
    for (var i = 0; i < 6; i++) {
      for (var j = 0; j < 6; j++) {
        new Rune(i+3, j+3, i, "wait", "sprite_");
      }
    }
  }


  update() {
    //
    utils.resizeGame(this.game);
  }

  render() {
    //
    DEBUG && this.game.debug.text('FPS: ' + this.game.time.fps || 'FPS: --', 20, 50, DEBUG_color, DEBUG_font);
    /*
    game.debug.inputInfo(32, 32);
    game.debug.spriteInputInfo(sprite, 32, 130);
    game.debug.pointer( game.input.activePointer );*/
  }
 
}
 
//export default PlayGame;