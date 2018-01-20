/* globals Phaser */
/**
 * @class
 */
class ViewLoader {
  //
  constructor (game, configSpriteLoader) {
    /**
     * Ссылка на игровую сцену
     * @type {Phaser.State}
     */
    this.linkGame = game
    /**
     * Множитель скорости анимации
     * @type {Number}
     * @default 1
     */
    this.multiplierSpeedAnimation = 1
    /**
     * @type {}
     */
    this.configSpriteLoader = configSpriteLoader
    /**
     *
     * @type {}
     */
    this.loader = null
    /**
     *
     * @type {}
     */
    this.loaderTween = null
  }

  //
  renderLoder (time = null) {
    let loader = this.linkGame.add.image(60, 80, this.configSpriteLoader.fileName)
    loader.anchor.set(0.5)
    loader.width = this.configSpriteLoader.size.width
    loader.height = this.configSpriteLoader.size.height

    let tween = this.linkGame.add
      .tween(loader)
      .to({
        angle: 360
      },
      this.multiplierSpeedAnimation * 1500,
      Phaser.Easing.Linear.None,
      true,
      0,
      -1
    )
    this.loader = loader
    this.loaderTween = tween
    return tween
  }

  cleanLoder () {
    this.loaderTween.stop()
    this.loaderTween = null
    this.loader.destroy()
    this.loader = null
  }
}

module.exports = ViewLoader
