/* global Phaser, param, textureRune, texturePath, testBoard5, Board, activeRune, View, debug, Debug, queue, utils, DEBUG_color, DEBUG_font */

let testBoard
let board = {}
let view = {}
let debug = {}
let queue = {}
let activeRune = null

class PlayGame extends Phaser.State {
  init () {
    this.game.time.advancedTiming = true
    this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL

    testBoard = param.board
  }

  preload () {
    for (let i = 0; i < 6; i++) {
      this.game.load.spritesheet(textureRune.fileName + i, texturePath + textureRune.fileName + i + '.png', textureRune.size.width, textureRune.size.height, 12)
    }
  }

  create () {
    board = new Board()
    view = new View(this)
    queue = new Queue()
    debug = new Debug(board, view, queue)
    // бинды на события
    board.onLoad.add((board) => {
      if (board) {
        queue.add(view, 'renderBoard', [board, textureRune, true, 10, 100])
      }
    })

    board.onSwap.add((coordRunes) => {
      queue.add(view, 'renderSwap', [coordRunes[0], coordRunes[1]])
    })

    board.onDrop.add(function (coordRunes) {
      if (coordRunes.length) {
        // queue.add(view, 'renderDrop', [coordRunes])
      }
    })

    board.loadBoard(testBoard)
    board.swap({i: 1, j: 1}, {i: 3, j: 3})
    board.drop()
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
    console.log(('P: ' + pickRune.i + 'x' + pickRune.j))
    if (activeRune === null) {
      activeRune = pickRune
    } else {
      if (board.areTheSame(pickRune, activeRune)) {
        activeRune = null
      } else {
        if (board.isAdjacentRune(activeRune, pickRune) && !board.comparisonType(activeRune, pickRune)) {
          board.swap(activeRune, pickRune)
          activeRune = null
        } else {
          activeRune = pickRune
        }
      }
    }
  }
}
