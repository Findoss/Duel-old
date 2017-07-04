/* globals Phaser, textureRune */

class View {
  constructor (game, configSpriteRune) {
    this.linkGame = game
    this.configSpriteRune = configSpriteRune
  }

  // FORMULA
  posXRune (j) {
    return this.marginBoardX + j * (this.configSpriteRune.size.width + this.marginRune)
  }

  // FORMULA
  posYRune (i) {
    return this.marginBoardY + i * (this.configSpriteRune.size.height + this.marginRune)
  }

  renderRune (i, j, type) {
    let rune = this.linkGame.add.sprite(this.posXRune(j), this.posYRune(6 - i) * -1, this.configSpriteRune.fileName + type)
    rune.width = this.configSpriteRune.size.width
    rune.height = this.configSpriteRune.size.height
    rune.inputEnabled = true
    rune.anchor.set(0.5)
    if (this.configSpriteRune.animations !== undefined) {
      for (let animationName in this.configSpriteRune.animations) {
        rune.animations.add(animationName, this.configSpriteRune.animations[animationName])
      }
      let firstAnimation = Object.keys(this.configSpriteRune.animations)[0]
      rune.animations.play(firstAnimation, this.configSpriteRune.animations[firstAnimation].length, true)
    }
    for (let eventName in this.configSpriteRune.events) {
      rune.events[eventName].add(this.linkGame[ this.configSpriteRune.events[eventName] ], this.linkGame, 0, {i: i, j: j})
    }
    return rune
  }

  cleanBoard () {
    if (this.board !== undefined) {
      delete this.board
      this.groupBoard.destroy()
    }
  }

  renderBoard (board, marginRune, marginBoardX, marginBoardY) {
    this.cleanBoard()
    this.board = []
    this.groupBoard = this.linkGame.add.group()
    this.marginRune = marginRune || this.configSpriteRune.size.width / 10
    this.marginBoardX = marginBoardX || 150
    this.marginBoardY = marginBoardY || 150

    let tween = {}
    for (let i = 0; i < board.length; i++) {
      this.board[i] = []
      for (let j = 0; j < board[i].length; j++) {
        this.board[i][j] = this.renderRune(i, j, board[i][j].type)
        tween = this.linkGame.add
          .tween(this.board[i][j])
          .to({
            alpha: 1,
            y: this.posYRune(i)
          },
          400,
          Phaser.Easing.Linear.None,
          true
        )
        this.groupBoard.add(this.board[i][j])
      }
    }
    return tween
  }

  getIndexs (rune) {
    return rune.events.onInputDown['_bindings'][0]['_args'][0]
  }

  renderSwap (coordRuneOne, coordRuneTwo, speed) {
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
      speed || 250,
      Phaser.Easing.Linear.None,
      true
    )
    let lastTween = this.linkGame.add
      .tween(this.board[coordRuneTwo.i][coordRuneTwo.j])
      .to({
        x: this.board[coordRuneOne.i][coordRuneOne.j].x,
        y: this.board[coordRuneOne.i][coordRuneOne.j].y
      },
      speed || 250,
      Phaser.Easing.Linear.None,
      true
    )
    return lastTween
  }

  cleanRunes (runes) {
    let groupDelRunes = this.linkGame.add.group()
    for (let l = 0; l < runes.length; l++) {
      groupDelRunes.add(this.board[runes[l].i][runes[l].j])
    }
    groupDelRunes.destroy()
  }

  renderRefill (runes, configSpriteRune) {
    this.cleanRunes(runes)
    let tween = {}
    for (let l = 0; l < runes.length; l++) {
      let rune = this.renderRune(runes[l].i, runes[l].j, runes[l].type)
      for (let eventName in configSpriteRune.events) {
        rune.events[eventName].add(this.linkGame[ configSpriteRune.events[eventName] ], this.linkGame, 0, {i: runes[l].i, j: runes[l].j})
      }
      this.board[runes[l].i][runes[l].j] = rune
      this.groupBoard.add(rune)
      tween = this.linkGame.add
        .tween(rune)
        .to({
          y: this.posYRune(runes[l].i),
          alpha: 1
        },
        500,
        Phaser.Easing.Linear.None,
        true
      )
    }
    return tween
  }

  renderDel (delRunes) {
    let groupDelRunes = this.linkGame.add.group()

    for (let i = 0; i < delRunes.length; i++) {
      groupDelRunes.add(this.board[delRunes[i].i][delRunes[i].j])
      this.linkGame.add
            .tween(this.board[delRunes[i].i][delRunes[i].j].scale)
            .to({
              x: 0.3,
              y: 0.3
            },
            150,
            Phaser.Easing.Linear.None,
            true
          )
    }

    let tween = this.linkGame.add
      .tween(groupDelRunes)
      .to({
        alpha: 0
      },
      200,
      Phaser.Easing.Linear.None,
      true
    )

    return tween
  }

  renderDrop (dropRunes) {
    let tween = {}
    return tween
  }
}
