class Utils {
  resizeGame (game) {
    game.scale.scaleMode = 2
    game.scale.setShowAll()
    game.scale.refresh()
  }
}

module.exports = Utils
