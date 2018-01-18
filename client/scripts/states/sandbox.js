/* globals Phaser, game */
const IO = require('socket.io-client')

const Utils = require('../utils')

const configTextures = require('../configs/textures')
const textureSuggestion = require('../textures/suggestion')
const textureRune = require('../textures/rune')

const Queue = require('../classes/queue')
const View = require('../classes/view')
const log = require('../../../libs/log')

class Sandbox extends Phaser.State {
  constructor () {
    super()
    this.socket = new IO('http://localhost:8080')
    this.utils = new Utils()

    this.view = {}
    this.queue = {}
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
    this.queue = new Queue()
    this.view = new View(this, textureRune)

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

  runeClick (rune, param, coordRune) {
    this.cleanSuggestion()
    if (this.activeRune !== null) {
      if (this.activeRune !== rune) {
        let coordactiveRune = this.view.getIndexs(this.activeRune)
        if (this.isAdjacent(coordRune, coordactiveRune)) {
          this.socket.emit('board/swap', coordRune, coordactiveRune)
          this.deactive()
        } else {
          this.deactive()
          this.active(rune)
        }
      } else {
        this.deactive()
      }
    } else {
      this.active(rune)
    }
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
      log('server', changes[0]['event'])
      changes.forEach(({ event, data }) => {
        this[event](data)
      })
    })

    this.socket.on('msg', (msg) => {
      log(msg)
    })
  }

  // ***************** //

  isAdjacent (coordOne, coordTwo) {
    return (Math.abs(coordTwo.i - coordOne.i) === 1 && Math.abs(coordTwo.j - coordOne.j) === 0) ||
           (Math.abs(coordTwo.i - coordOne.i) === 0 && Math.abs(coordTwo.j - coordOne.j) === 1)
  }

  active (rune) {
    this.activeRune = rune
    this.activeRune.animations.play('pick', 4, true)
  }

  deactive () {
    this.activeRune.animations.play('wait', 4, true)
    this.activeRune = null
  }

  cleanSuggestion () {
    this.view.cleanSuggestion()
  }

  loadBoard (newBoard) {
    this.queue.add(this.view, 'renderBoard', true, newBoard)
    this.socket.emit('board/suggestion')
  }

  suggestion (suggestions) {
    this.queue.add(this.view, 'renderAllSuggestion', false, suggestions, textureSuggestion)
  }

  swap (coords) {
    this.view.cleanSuggestion()
    this.queue.add(this.view, 'renderSwap', true, coords[0], coords[1])
  }

  fakeSwap (coords) {
    this.queue.add(this.view, 'renderSwap', true, coords[0], coords[1])
    this.queue.add(this.view, 'renderSwap', true, coords[0], coords[1])
    this.socket.emit('board/suggestion')
  }

  delete (coords) {
    this.queue.add(this.view, 'renderDeleteRunes', true, coords)
  }

  drop (dropRunes) {
    if (dropRunes.length !== 0) {
      this.queue.add(this.view, 'renderDrop', true, dropRunes)
    }
  }

  refill (coordRunes) {
    this.queue.add(this.view, 'renderRefull', true, coordRunes)
    // временно
    this.socket.emit('board/suggestion')
  }
}

module.exports = Sandbox
