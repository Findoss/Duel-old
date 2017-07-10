/* global Phaser, param, game, textureRune, texturePath, testBoard5, Queue, Board, activeRune, View, debug, Debug, queue, utils, DEBUG_color, DEBUG_font */

let board = {}
let view = {}
let debug = {}
let queue = {}
let activeRune = null

let board2 = {}
let view2 = {}
let finger = {}

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
    this.game.load.spritesheet('finger', './images/finger.png', 40, 40, 0)
  }

  create () {
    for (let i = 1; i < 6; i++) {
      let aaa = game.add.sprite(i * 70 - 10, 800, textureRune.fileName + i)
      aaa.width = 50
      aaa.height = 50
    }

    board = new Board()
    view = new View(this, textureRune)
    queue = new Queue()
    debug = new Debug(board, view, queue)

    board2 = new Board()
    view2 = new View(this, textureRune)

    this.bindEvents(board)

    // TEST ZONE
    board.loadBoard(param.board)

    // board.generation(false)
    /*
    let XXX = 0
    do {
      let countMoves = board.findMoves()
      if (countMoves) {
        // console.log(board.moves)
        for (var i = 0; i < countMoves; i++) {
          view.hint(board.moves[i].b, board.moves[i].a, 'finger')
        }
        // let move = Math.floor(Math.random() * (countMoves))
        // console.log(move)
        // console.log(board.moves[move])
        // board.swapRune(board.moves[move].b, board.moves[move].a)
        // board.cleanMoves()
      }
      RUNES = board.loop()
      XXX++
    } while (XXX < 2)
    */
  }

  update () {
    utils.resizeGame(this.game)
  }

  render () {
    game.debug.text('FPS: ' + this.game.time.fps, 20, 50, DEBUG_color, DEBUG_font)
    game.debug.text('Q: ' + queue.queue.length, 150, 50, DEBUG_color, DEBUG_font)
    game.debug.text(MESSAGE, 320, 50, '#ff0000', DEBUG_font)
    if (activeRune !== null) this.game.debug.text('A: ' + view.getIndexs(activeRune).i + 'x' + view.getIndexs(activeRune).j, 230, 50, DEBUG_color, DEBUG_font)
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
      if (!board.areTheSame(coordPickRune, coordActiveRune)) {
        if (board.isAdjacentRune(coordActiveRune, coordPickRune)) {
          if (!board.comparisonType(coordActiveRune, coordPickRune)) {
            board.swapRune(coordActiveRune, coordPickRune)
            view.cleanHint()
            board.findClusters(coordActiveRune)
            board.findClusters(coordPickRune)
            if (board.clusters.length) {
              do {
                RUNES = board.deleteClusters()
                board.drop()
                board.refill()
              } while (board.findAllClusters().length)

              if (!board.findMoves().length) {
                board.deleteBoard()
                board.generation(false)
              }
              queue.add(view, 'renderHints', [board.findMoves(), 'finger'])
              board.cleanMoves()
            } else {
              board.swapRune(coordActiveRune, coordPickRune)
              queue.add(view, 'renderHints', [board.findMoves(), 'finger'])
              board.cleanMoves()
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
      } else {
        activeRune.animations.play('wait', 4, true)
        activeRune = null
      }
    }
  }

  bindEvents (board) {
    board.onLoad.add((newBoard) => {
      if (board) {
        queue.add(view, 'renderBoard', [newBoard, 10, 100])
        queue.add(view, 'renderHints', [board.findMoves(), 'finger'])
        board.cleanMoves()
      }
    })

    board.onLoad.add((newBoard) => {
      if (board) {
        view2.renderBoard(newBoard, 10, 100, 930)
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
