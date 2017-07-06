/* global Phaser, param, game, textureRune, texturePath, testBoard5, Queue, Board, activeRune, View, debug, Debug, queue, utils, DEBUG_color, DEBUG_font */

let board = {}
let view = {}
let debug = {}
let queue = {}
let activeRune = null

let MESSAGE = ''
let RUNES = []

class PlayGame extends Phaser.State {
  init () {
    this.game.time.advancedTiming = true
    this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL
  }

  preload () {
    for (let i = 0; i < 6; i++) {
      this.game.load.spritesheet(textureRune.fileName + i, texturePath + textureRune.fileName + i + '.png', textureRune.size.width, textureRune.size.height, 12)
    }
  }

  create () {
    board = new Board()
    view = new View(this, textureRune)
    queue = new Queue()
    debug = new Debug(board, view, queue)

    this.bindEvents(board)

    board.generation(false)
    // board.loadBoard(param.board)
    // console.log(board.isRuneInCluster(5, 4))
    // board.swapRune({i: 2, j: 4}, {i: 3, j: 4})
    // board.findClusters()
    // board.loop()
  }

  update () {
    utils.resizeGame(this.game)
  }

  render () {
    game.debug.text('FPS: ' + this.game.time.fps, 20, 50, DEBUG_color, DEBUG_font)
    game.debug.text('Q: ' + queue.queue.length, 150, 50, DEBUG_color, DEBUG_font)
    game.debug.text(MESSAGE, 320, 50, '#ff0000', DEBUG_font)
    if (activeRune !== null) this.game.debug.text('A: ' + view.getIndexs(activeRune).i + 'x' + view.getIndexs(activeRune).j, 230, 50, DEBUG_color, DEBUG_font)
    for (let i = 1; i < 6; i++) {
      let aaa = game.add.sprite(i * 70 - 10, 800, textureRune.fileName + i)
      aaa.width = 50
      aaa.height = 50
    }
    for (let rune in RUNES) {
      game.debug.text(RUNES[rune], rune * 70, 830, '#ffffff', '30px Arial')
    }
  }

  runeClick (pickRune, param, coordPickRune) {
    if (activeRune === null) {
      activeRune = pickRune
      pickRune.animations.play('pick', 4, true)
    } else {
      let coordActiveRune = view.getIndexs(activeRune)
      if (board.areTheSame(coordPickRune, coordActiveRune)) {
        activeRune.animations.play('wait', 4, true)
        activeRune = null
      } else {
        if (board.isAdjacentRune(coordActiveRune, coordPickRune)) {
          if (!board.comparisonType(coordActiveRune, coordPickRune)) {
            if (board.swapRune(coordActiveRune, coordPickRune).length) {
              RUNES = board.loop()
              // console.log(RUNES)
            } else {
              board.swapRune(coordActiveRune, coordPickRune)
            }
            activeRune.animations.play('wait', 4, true)
            activeRune = null
          } else {
            board.preSwap.dispatch([coordActiveRune, coordPickRune])
            board.preSwap.dispatch([coordActiveRune, coordPickRune])
            activeRune.animations.play('wait', 4, true)
            activeRune = null
          }
        } else {
          activeRune.animations.play('wait', 4, true)
          activeRune = pickRune
          pickRune.animations.play('pick', 4, true)
        }
      }
    }
  }

  bindEvents (board) {
    board.onLoad.add((board) => {
      if (board) {
        queue.add(view, 'renderBoard', [board, 10, 100])
      }
    })

    board.preSwap.add((coordRunes) => {
      queue.add(view, 'renderSwap', [coordRunes[0], coordRunes[1]])
    })

    board.onRefill.add(function (coordRunes) {
      if (coordRunes.length) {
        queue.add(view, 'renderRefill', [coordRunes, textureRune])
      }
    })

    board.onDrop.add(function (dropRunes) {
      if (dropRunes.length) {
        for (let i = 0; i < dropRunes.length; i++) {
          queue.add(view, 'renderSwap', [dropRunes[i][0], dropRunes[i][1], 45])
        }
      }
    })

    board.onDeleteClusters.add(function (coordRunes) {
      queue.add(view, 'renderDel', [coordRunes])
    })
  }
}
