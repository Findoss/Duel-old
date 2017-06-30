/* global Phaser, param, textureRune, texturePath, testBoard5, Queue, Board, activeRune, View, debug, Debug, queue, utils, DEBUG_color, DEBUG_font */

let board = {}
let view = {}
let debug = {}
let queue = {}
let activeRune = null

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
    // board.swapRune({i: 2, j: 4}, {i: 3, j: 4})
    // board.findClusters()
    // board.loop()
  }

  update () {
    utils.resizeGame(this.game)
  }

  render () {
    this.game.debug.text('FPS: ' + this.game.time.fps, 20, 50, DEBUG_color, DEBUG_font)
    this.game.debug.text('Q: ' + queue.queue.length, 150, 50, DEBUG_color, DEBUG_font)
    if (activeRune !== null) this.game.debug.text('A: ' + activeRune.i + 'x' + activeRune.j, 230, 50, DEBUG_color, DEBUG_font)
  }

  runeClick (rune, param, coord) {
    let pickRune = coord
    if (activeRune === null) {
      activeRune = pickRune
    } else {
      if (board.areTheSame(pickRune, activeRune)) {
        activeRune = null
      } else {
        if (board.isAdjacentRune(activeRune, pickRune)) {
          if (!board.comparisonType(activeRune, pickRune)) {
            board.swapRune(activeRune, pickRune)
            if (board.findClusters().length) {
              board.loop()
            } else {
              board.swapRune(activeRune, pickRune)
            }
            activeRune = null
          } else {
            board.onSwap.dispatch([activeRune, pickRune])
            board.onSwap.dispatch([activeRune, pickRune])
            activeRune = null
          }
        } else {
          activeRune = pickRune
        }
      }
    }
  }

  bindEvents (board) {
    board.onLoad.add((board) => {
      console.log(board)
      if (board) {
        queue.add(view, 'renderBoard', [board, 10, 100])
      }
    })

    board.onSwap.add((coordRunes) => {
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
