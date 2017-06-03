class Utils {

  constructor() {}

  resizeGame(game) {
    game.scale.scaleMode = 2;
    game.scale.setShowAll();
    game.scale.refresh();
  }

}

var utils = new Utils();