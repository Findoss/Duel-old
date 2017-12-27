/* globals Phaser, View, Queue, game, DEBUG, utils, socket, textureSuggestion, textureRune, configTextures */

class Sandbox extends Phaser.State {

  constructor () {
    super()
    let view = {}
    let queue = {}
    let activeRune = null
  }

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
      configTextures.path + configTextures.skin + textureSuggestion.fileName + configTextures.ext
    )

    // загрузка рун
    for (let i = 0; i < 6; i++) {
      this.game.load.spritesheet(
        textureRune.fileName + i,
        configTextures.path + textureRune.fileName + i + configTextures.ext,
        textureRune.size.width,
        textureRune.size.height,
        12
      )
    }
  }

  create () {
    // рендер руки
    // let suggestion = this.game.add.sprite(100, 100, textureSuggestion.fileName)

    //
    this.queue = new Queue()
    this.view = new View(this, textureRune)

    //
    this.bindEvents()

    //
    socket.emit('game', 'generation')
  }

  update () {
    // перехватываем ресайз игры и масштабируем
    utils.resizeGame(this.game)
  }

  render () {
    DEBUG.fps && game.debug.text('FPS: ' + this.game.time.fps, 20, 30, '#00ff00', '25px Arial')
  }

  bindEvents () {
    socket.on('generation', (newBoard) => {
      DEBUG.socket && console.log(newBoard)
      this.queue.add(this.view, 'renderBoard', true, newBoard)
    })
  }

  runeClick (pickRune, param, coordPickRune) {
    socket.emit('game', 'pick', coordPickRune)
  }

  runeOver (rune) {
    if (activeRune !== rune) {
      rune.animations.play('focus', 1, true)
    }
  }

  runeOut (rune) {
    if (activeRune !== rune) {
      rune.animations.play('wait', 4, true)
    }
  }
}
