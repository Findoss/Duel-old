/* global Phaser, textureSuggestion,  param, game, textureRune, texturePath, Queue, Board, View, Debug, utils */

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
    this.game.load.image(textureSuggestion.fileName, texturePath + textureSuggestion.fileName + '.png')
  }

  create () {
    for (let i = 1; i < 6; i++) {
      let aaa = this.game.add.sprite(i * 70 - 10, 750, textureRune.fileName + i)
      aaa.width = 50
      aaa.height = 50
    }

    board = new Board()
    view = new View(this, textureRune)
    view.multiplierSpeedAnimation = 1
    queue = new Queue()
    debug = new Debug(board, view, queue)

    this.bindEvents(board)

    // TEST ZONE
    board.loadBoard(param.board)
    // view.renderRefill([{i: 1, j: 1, type: 3}])
    // view.renderBoard(param.board)
  }

  update () {
    utils.resizeGame(this.game)
  }

  render () {
    // FPS
    game.debug.text('FPS: ' + this.game.time.fps, 20, 30, '#00ff00', '25px Arial')
    // Queue.length
    game.debug.text('Q: ' + queue.queue.length, 150, 30, '#00ff00', '25px Arial')
    // Extra message
    game.debug.text(MESSAGE, 320, 30, '#ff0000', '25px Arial')
    // coord active rune
    if (activeRune !== null) this.game.debug.text('A: ' + view.getIndexs(activeRune).i + 'x' + view.getIndexs(activeRune).j, 230, 30, '#00ff00', '25px Arial')
    // points
    for (let rune in RUNES) game.debug.text(RUNES[rune], rune * 72, 785, '#ffffff', '30px Arial')
    // Queue
    queue.queue.forEach((command, i) => {
      let color = '#00ff00'
      if (!command.isBlocking) color = '#5080ff'
      if (i === 0) color = '#f0ff0f'
      game.debug.text(command.command, 20, i * 30 + 900, color, '25px Arial')
    })
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

  runeClick (pickRune, param, coordPickRune) {
    view.cleanSuggestion()
    queue.add(view, 'blockRunes', false)
    if (activeRune !== null) {
      let coordActiveRune = view.getIndexs(activeRune)
      if (!board.areTheSame(coordPickRune, coordActiveRune)) {
        if (board.isAdjacentRune(coordActiveRune, coordPickRune)) {
          if (!board.comparisonType(coordActiveRune, coordPickRune)) {
            board.swapRune(coordActiveRune, coordPickRune)
            board.findClusters(coordActiveRune)
            board.findClusters(coordPickRune)
            if (board.clusters.length) {
              // view.blockRunes()
              do {
                RUNES = board.deleteClusters()
                board.drop()
                board.refill()
              } while (board.findAllClusters().length)
              queue.add(view, 'renderAllSuggestion', false, board.findMoves(), textureSuggestion)
              queue.add(view, 'unBlockRunes', false)

              if (!board.findMoves().length) {
                board.deleteBoard()
                board.generation(false)
              }
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
      } else {
        activeRune.animations.play('wait', 4, true)
        activeRune = null
        queue.add(view, 'renderAllSuggestion', false, board.findMoves(), textureSuggestion)
      }
    } else {
      activeRune = pickRune
      pickRune.animations.play('pick', 4, true)
    }
    queue.add(view, 'unBlockRunes', false)
  }

  bindEvents (board) {
    board.onLoad.add((newBoard) => {
      queue.add(view, 'renderBoard', true, newBoard)
      console.log(board.findMoves().length)
      queue.add(view, 'renderAllSuggestion', false, board.findMoves(), textureSuggestion)
    })

    board.onDeleteBoard.add(() => {
      queue.add(view, 'renderDeleteBoard', true)
      view.cleanSuggestion()
    })

    board.preSwap.add((coordRunes) => {
      queue.add(view, 'renderSwap', true, coordRunes[0], coordRunes[1])
    })

    board.onRefill.add((coordRunes) => {
      if (coordRunes.length) {
        queue.add(view, 'renderRefull', true, coordRunes)
      }
    })

    board.onDrop.add((dropRunes) => {
      if (dropRunes.length > 0) {
        queue.add(view, 'renderDrop', true, dropRunes)
      }
    })

    board.onDeleteClusters.add((coordRunes) => {
      queue.add(view, 'renderDeleteRunes', true, coordRunes)
    })
  }
}
