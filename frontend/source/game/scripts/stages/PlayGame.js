//
var sprite ;
var counter = 0 ;
var step = Math.PI * 2 / 250 ;


var PlayGame = function(game){}
PlayGame.prototype = {
  init: function(){
    //
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
    
    //
    console.log("param = "+param.key);
  },
  preload: function(){
    //
    game.load.image('sprite', './images/rune.png');
  },
  create: function(){
    //
    sprite = game.add.sprite(0, 0, 'sprite');
    sprite.x = game.width / 2 ;
    sprite.anchor.x = sprite.anchor.y = 0.5 ;
    sprite.inputEnabled = true ;
  },
  update: function(){
    //
    var tStep = Math.sin( counter ) ;
    sprite.y = (game.height/2) + tStep * 50 ;
    sprite.rotation += Phaser.Math.degToRad( 0.3 * tStep ) ;
    counter += step ;
    //
    util.resizeGame(game);
  },
  render: function(){
    game.debug.text('FPS: ' + game.time.fps || 'FPS: --', 30, 30, "#00ff00",50);
    /*
    game.debug.inputInfo(32, 32);
    game.debug.spriteInputInfo(sprite, 32, 130);
    game.debug.pointer( game.input.activePointer );*/
  }
}