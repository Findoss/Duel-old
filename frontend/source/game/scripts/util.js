var util = {};

//
util.resizeGame = function(game){
  game.scale.scaleMode = 2;
  game.scale.setShowAll();
  game.scale.refresh();
}