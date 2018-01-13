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

    // класс поля
    this.board = {}
    // класс отрисовки
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

    // инициализация поля
    this.board = new Board()

    // обработчики событий логики
    this.bindEventsLogic()
    // обработчики событий c сервера
    this.bindEventsServer()

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

  runeClick (rune, param, coord) {
    if (this.view.activeRune !== null) {
      let coordActive = this.view.getIndexs(this.view.activeRune)
      if (!this.board.isEqualCoords(coord, coordActive)) {
        if (this.board.isAdjacent(coord, coordActive)) {
          this.board.swap(coord, coordActive)
          this.board.findClusters(coord)
          this.board.findClusters(coordActive)
          if (this.board.isClusters()) {
            this.socket.emit('board/swap', [coord, coordActive])
            this.board.signal.emit('onDeactiveRune')
            // do {
            this.board.deleteClusters()
            this.board.drop()
              // this.board.refill()
            // } while (this.board.findAllClusters().length > 0)
          } else {
            this.board.swap(coord, coordActive)
          }
        } else {
          this.board.signal.emit('onDeactiveRune')
          this.board.signal.emit('onActiveRune', rune)
        }
      } else {
        this.board.signal.emit('onDeactiveRune')
      }
    } else {
      this.board.signal.emit('onActiveRune', rune)
    }
  }

  runeOver (rune) {
    if (rune !== this.view.activeRune) {
      rune.animations.play('focus', 1, true)
    }
  }

  runeOut (rune) {
    if (rune !== this.view.activeRune) {
      rune.animations.play('wait', 4, true)
    }
  }

  bindEventsLogic () {
    this.board.signal.on('onloadBoard', (newBoard) => {
      log('client', 'onloadBoard', newBoard)
      this.queue.add(this.view, 'renderBoard', true, newBoard)
      this.queue.add(this.view, 'renderAllSuggestion', false, this.board.findMoves(), textureSuggestion)
    })

    this.board.signal.on('onActiveRune', (rune) => {
      this.view.cleanSuggestion()
      this.view.activeRune = rune
      this.view.activeRune.animations.play('pick', 4, true)
    })

    this.board.signal.on('onDeactiveRune', () => {
      this.view.activeRune.animations.play('wait', 4, true)
      this.view.activeRune = null
      this.queue.add(this.view, 'renderAllSuggestion', false, this.board.findMoves(), textureSuggestion)
    })

    this.board.signal.on('onSwap', (coordRunes) => {
      this.queue.add(this.view, 'renderSwap', true, coordRunes[0], coordRunes[1])
    })

    this.board.signal.on('onDeleteCluster', (coordRunes) => {
      this.queue.add(this.view, 'renderDeleteRunes', true, coordRunes)
    })

    this.board.signal.on('onDrop', (coordRunes) => {
      if (coordRunes.length > 0) {
        this.queue.add(this.view, 'renderDrop', true, coordRunes)
      }
    })

    this.board.signal.on('onRefill', (newRune) => {
      this.queue.add(this.view, 'renderRefull', true, newRune)
    })
  }

  bindEventsServer () {
    this.socket.on('msg', (msg) => {
      log('client', msg)
    })

    this.socket.on('board/generation', (newBoard) => {
      log('client', 'board/generation')
      this.board.loadBoard(newBoard)
    })

    this.socket.on('board/refill', (coordRunes) => {
      this.queue.add(this.view, 'renderRefull', true, coordRunes)
    })
  }
}

module.exports = Sandbox
