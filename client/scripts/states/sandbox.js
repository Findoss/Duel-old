/* globals Phaser, game */
const IO = require('socket.io-client')

const Utils = require('../utils')

const configTextures = require('../configs/textures')
const textureSuggestion = require('../textures/suggestion')
const textureRune = require('../textures/rune')

const Queue = require('../classes/queue')
const View = require('../classes/view')

const Board = require('../../../libs/board')
const log = require('../../../libs/log')

class Sandbox extends Phaser.State {
  constructor () {
    super()
    this.utils = new Utils()
    this.view = {}
    this.queue = {}
    this.activeRune = null
    this.socket = new IO('http://localhost:8080')
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
    DEBUG.socket && this.socket.emit('msg', 'connected')

    //
    this.queue = new Queue()
    this.view = new View(this, textureRune)

    //
    this.bindEvents()

    //
    this.socket.emit('lobby/ready')
  }

  update () {
    // перехватываем ресайз игры и масштабируем
    this.utils.resizeGame(this.game)
  }

  render () {
    DEBUG.fps && game.debug.text('FPS: ' + this.game.time.fps, 20, 30, '#00ff00', '25px Arial')
  }

  bindEvents () {
    this.socket.on('generation', (newBoard) => {
      DEBUG.socket && console.log(newBoard)
      this.queue.add(this.view, 'renderBoard', true, newBoard)
    })

    this.socket.on('suggestion', (suggestions) => {
      DEBUG.socket && console.log(suggestions)
      this.queue.add(this.view, 'renderAllSuggestion', false, suggestions, textureSuggestion)
    })

    this.socket.on('load', (board) => {
      DEBUG.socket && console.log(board)
      this.queue.add(this.view, 'renderBoard', true, board)
    })

    this.socket.on('active', (coord) => {
      DEBUG.socket && console.log(coord)
      this.activeRune = this.view.board[coord.i][coord.j]
      this.view.board[coord.i][coord.j].animations.play('pick', 4, true)
    })

    this.socket.on('deactive', (coord) => {
      DEBUG.socket && console.log(coord)
      this.activeRune.animations.play('wait', 4, true)
      this.activeRune = null
    })

    this.socket.on('swap', (coords) => {
      DEBUG.socket && console.log(coords)
      this.view.cleanSuggestion()
      this.queue.add(this.view, 'renderSwap', true, coords[0], coords[1])
    })

    this.socket.on('deleteRunes', (coords) => {
      DEBUG.socket && console.log(coords)
      this.queue.add(this.view, 'renderDeleteRunes', true, coords)
    })

    this.socket.on('drop', (dropRunes) => {
      DEBUG.socket && console.log(dropRunes)
      if (dropRunes.length !== 0) {
        this.queue.add(this.view, 'renderDrop', true, dropRunes)
      }
    })

    this.socket.on('refill', (coordRunes) => {
      DEBUG.socket && console.log(coordRunes)
      this.queue.add(this.view, 'renderRefull', true, coordRunes)
    })
  }

  runeClick (pickRune, param, coordPickRune) {
    this.socket.emit('board/pick', coordPickRune)
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
}

module.exports = Sandbox
