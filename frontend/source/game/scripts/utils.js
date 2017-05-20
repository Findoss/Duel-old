var utils = {};

//
utils.resizeGame = function(game){
  game.scale.scaleMode = 2;
  game.scale.setShowAll();
  game.scale.refresh();
}