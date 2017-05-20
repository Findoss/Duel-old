//
var sprite ;
var counter = 0 ;
var step = Math.PI * 2 / 250 ;

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
    this.game.load.image('sprite', './images/rune.png');
  }

  create() {
    //
    this.sprite = this.game.add.sprite(0, 0, 'sprite');
    this.sprite.x = this.game.width / 2 ;
    this.sprite.anchor.x = this.sprite.anchor.y = 0.5 ;
    this.sprite.inputEnabled = true ;
  }

  update() {
    //
    var tStep = Math.sin( counter ) ;
    this.sprite.y = (this.game.height/2) + tStep * 50 ;
    this.sprite.rotation += Phaser.Math.degToRad( 0.3 * tStep ) ;
    counter += step ;
    //
    utils.resizeGame(this.game);
  }

  render() {
    //
    DEBUG && this.game.debug.text('FPS: ' + this.game.time.fps || 'FPS: --', 20, 50, DEBUG_color, DEBUG_font);
    DEBUG && this.game.debug.pixel( 200, 280, 'rgba(0,255,255,1)' ) ;
    /*
    game.debug.inputInfo(32, 32);
    game.debug.spriteInputInfo(sprite, 32, 130);
    game.debug.pointer( game.input.activePointer );*/
  }
 
}
 
//export default PlayGame;