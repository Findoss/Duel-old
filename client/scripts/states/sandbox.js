/* globals Phaser, textureSuggestion, configTextures */

class Sandbox extends Phaser.State {
  init () {
    // влючаем время для вывода FPS
    this.game.time.advancedTiming = true
    // влючаем возможность разворачивать на весь экран F11
    this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL
  }

  preload () {
    // загрузка руки (подсказка)
    this.game.load.image(
      textureSuggestion.fileName,
      configTextures.path +
      configTextures.skin +
      textureSuggestion.fileName +
      configTextures.ext
    )
  }

  create () {
    // рендер руки
    let suggestion = this.game.add.sprite(100, 100, textureSuggestion.fileName)
  }

  update () {
    // перехватываем ресайз игры и масштабируем
    utils.resizeGame(this.gam
  }

  render () {}
}
