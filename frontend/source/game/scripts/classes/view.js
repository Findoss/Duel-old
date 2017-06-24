/* globals Phaser, textureRune */

class View {
  constructor (game) {
    this.linkGame = game
  }

  renderRune (i, j, type, configSprite, inputEnabled) {
    // #formula pos
    let x = this.marginBoardX + j * (configSprite.size.width + this.marginRune)
    let y = this.marginBoardY + i * (configSprite.size.height + this.marginRune)
    let rune
    rune = this.linkGame.add.sprite(x, y, configSprite.fileName + type)
    rune.anchor.set(0.5)
    rune.width = configSprite.size.width
    rune.height = configSprite.size.height
    rune.visible = true
    rune.inputEnabled = inputEnabled || false

    if (configSprite.animations !== undefined) {
      for (let animationName in configSprite.animations) {
        rune.animations.add(animationName, configSprite.animations[animationName])
      }
      let firstAnimation = Object.keys(configSprite.animations)[0]
      rune.animations.play(firstAnimation, configSprite.animations[firstAnimation].length, true)
    }

    if (inputEnabled) {
      for (let eventName in configSprite.events) {
        rune.events[eventName].add(this.linkGame[ configSprite.events[eventName] ], this.linkGame, 0, {i: i, j: j})
      };
    }
    return rune
  }

  cleanBoard () {
    if (this.board !== undefined) {
      delete this.board
      this.groupBoard.destroy()
    }
  }

  renderBoard (board, configSpriteRune, inputEnabled, marginRune, marginBoardX, marginBoardY) {
    this.cleanBoard()
    this.board = []
    this.groupBoard = this.linkGame.add.group()
    this.marginRune = marginRune || configSpriteRune.size.width / 10
    this.marginBoardX = marginBoardX || 150
    this.marginBoardY = marginBoardY || 150

    for (let i = 0; i < board.length; i++) {
      this.board[i] = []
      for (let j = 0; j < board[i].length; j++) {
        this.board[i][j] = this.renderRune(i, j, board[i][j].type, configSpriteRune, inputEnabled)
        this.groupBoard.add(this.board[i][j])
      }
    }
    this.groupBoard.alpha = 0

    let tween = this.linkGame.add
      .tween(this.groupBoard)
      .to({alpha: 1}, 1100, Phaser.Easing.Linear.None, true)

    return tween
  }

  renderSwap (coordRuneOne, coordRuneTwo) {
    // исправить хак на пареметры события
    this.board[coordRuneOne.i][coordRuneOne.j].events.onInputDown['_bindings'][0]['_args'][0] = {i: coordRuneTwo.i, j: coordRuneTwo.j}
    this.board[coordRuneTwo.i][coordRuneTwo.j].events.onInputDown['_bindings'][0]['_args'][0] = {i: coordRuneOne.i, j: coordRuneOne.j}

    let tmp = this.board[coordRuneOne.i][coordRuneOne.j]
    this.board[coordRuneOne.i][coordRuneOne.j] = this.board[coordRuneTwo.i][coordRuneTwo.j]
    this.board[coordRuneTwo.i][coordRuneTwo.j] = tmp

    this.linkGame.add
      .tween(this.board[coordRuneOne.i][coordRuneOne.j])
      .to({
        x: this.board[coordRuneTwo.i][coordRuneTwo.j].x,
        y: this.board[coordRuneTwo.i][coordRuneTwo.j].y
      },
      200,
      Phaser.Easing.Linear.None,
      true
    )

    let lastTween = this.linkGame.add
      .tween(this.board[coordRuneTwo.i][coordRuneTwo.j])
      .to({
        x: this.board[coordRuneOne.i][coordRuneOne.j].x,
        y: this.board[coordRuneOne.i][coordRuneOne.j].y
      },
      200,
      Phaser.Easing.Linear.None,
      true
    )

    return lastTween
  }
}
