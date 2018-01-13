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
    // вспомогательные инструменты для Phaser
    this.utils = new Utils()
    // сокеты
    this.socket = new IO('http://localhost:8080')
    this.view = {}
    // класс очереди
    this.queue = {}
  }

  init () {
    // не останавливать js при неактивной вкладке
    game.stage.disableVisibilityChange = true
    // влючаем время для вывода FPS
    this.game.time.advancedTiming = true
    // влючаем возможность разворачивать на весь экран - F11
    this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL
  }

  preload () {
    // загрузка спрайта руки (подсказка)
    this.game.load.image(
      textureSuggestion.fileName,
      configTextures.path + configTextures.skin + textureSuggestion.fileName + configTextures.ext
    )

    // загрузка спрайтов рун
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
    // инициализация отрисовки
    this.queue = new Queue()
    // инициализация очереди
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
    game.debug.text('FPS: ' + this.game.time.fps, 20, 30, '#00ff00', '25px Arial')
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

  bindEvents () {
    this.socket.on('generation', (newBoard) => {
      log('client', newBoard)
      this.queue.add(this.view, 'renderBoard', true, newBoard)
    })

    this.socket.on('suggestion', (suggestions) => {
      this.queue.add(this.view, 'renderAllSuggestion', false, suggestions, textureSuggestion)
    })

    this.socket.on('load', (board) => {
      this.queue.add(this.view, 'renderBoard', true, board)
    })

    this.socket.on('active', (coord) => {
      this.activeRune = this.view.board[coord.i][coord.j]
      this.view.board[coord.i][coord.j].animations.play('pick', 4, true)
    })

    this.socket.on('deactive', (coord) => {
      this.activeRune.animations.play('wait', 4, true)
      this.activeRune = null
    })

    this.socket.on('swap', (coords) => {
      this.view.cleanSuggestion()
      this.queue.add(this.view, 'renderSwap', true, coords[0], coords[1])
    })

    this.socket.on('deleteRunes', (coords) => {
      this.queue.add(this.view, 'renderDeleteRunes', true, coords)
    })

    this.socket.on('drop', (dropRunes) => {
      if (dropRunes.length !== 0) {
        this.queue.add(this.view, 'renderDrop', true, dropRunes)
      }
    })

    this.socket.on('refill', (coordRunes) => {
      this.queue.add(this.view, 'renderRefull', true, coordRunes)
    })
  }
}

module.exports = Sandbox
