class Utils {
  resizeGame (game) {
    game.scale.scaleMode = 2
    game.scale.setShowAll()
    game.scale.refresh()
  }
}

let utils = new Utils()
