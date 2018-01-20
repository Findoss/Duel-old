/* globals Phaser, game */
const IO = require('socket.io-client')
const log = require('../../../libs/log')

const Utils = require('../utils')

const configTextures = require('../configs/textures')
const textureSuggestion = require('../textures/suggestion')
const textureLoader = require('../textures/loader')
const textureRune = require('../textures/rune')

const Queue = require('../views/queue')
const ViewBoard = require('../views/viewBoard')
const ViewLoader = require('../views/viewLoader')

const scenarios = require('../scenarios/index')

class Sandbox extends Phaser.State {
  constructor () {
    super()
    this.socket = new IO('http://localhost:8080')
    this.utils = new Utils()

    this.queue = {}
    this.viewBoard = {}
    this.viewLoader = {}
    this.activeRune = null
  }

  init () {
    // отрисовывка в фоне
    game.stage.disableVisibilityChange = true
    // влючаем время для вывода FPS
    this.game.time.advancedTiming = true
    // влючаем возможность разворачивать на весь экран F11
    this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL
  }

  preload () {
    // загрузка спинера
    this.game.load.image(
      textureLoader.fileName,
      configTextures.path + configTextures.skin + textureLoader.fileName + configTextures.ext
    )

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
    //
    this.id = null
    this.queue = new Queue()
    this.viewBoard = new ViewBoard(this, textureRune, textureSuggestion)
    this.viewLoader = new ViewLoader(this, textureLoader)

    //
    this.bindEvents()

    //
    this.socket.emit('msg', 'lobby/ready')
    this.socket.emit('lobby/ready')
  }

  update () {
    // перехватываем ресайз игры и масштабируем
    this.utils.resizeGame(this.game)
  }

  render () {
    game.debug.text('FPS: ' + this.game.time.fps, 20, 30, '#00ff00', '25px Arial')
  }

  runeClick (rune) {
    scenarios['cleanSuggestion'](this)()
    this.viewBoard.blockBoard()
    if (this.activeRune !== null) {
      if (this.activeRune !== rune) {
        if (this.isAdjacent(rune.coord, this.activeRune.coord)) {
          this.socket.emit('board/swap', this.id, rune.coord, this.activeRune.coord)
          scenarios['makeInactiveRune'](this)()
        } else {
          scenarios['makeInactiveRune'](this)()
          scenarios['makeActiveRune'](this)(rune)
        }
      } else {
        scenarios['makeInactiveRune'](this)()
        this.socket.emit('board/suggestion', this.id)
      }
    } else {
      scenarios['makeActiveRune'](this)(rune)
    }
    this.viewBoard.unblockBoard()
  }

  runeOver (rune) {
    if (rune !== this.activeRune) {
      rune.animations.play('focus', 1, true)
    }
  }

  runeOut (rune) {
    if (rune !== this.activeRune) {
      rune.animations.play('wait', 4, true)
    }
  }

  bindEvents () {
    this.socket.on('changes', (changes) => {
      changes.forEach(({ event, data }) => {
        scenarios[event](this)(data)
      })
    })

    this.socket.on('msg', (msg) => {
      log(msg)
    })
  }

  // ***************** //
  isAdjacent (coordOne, coordTwo) {
    const a = Math.abs(coordTwo.i - coordOne.i)
    const b = Math.abs(coordTwo.j - coordOne.j)
    return a + b === 1
  }
}

module.exports = Sandbox
