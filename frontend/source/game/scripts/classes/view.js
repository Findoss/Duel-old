class View {

  constructor(game) {
    this.linkGame = game;
  }

  renderRune(type, x, y, configSprite, inputEnabled) {
    let rune;
    rune = this.linkGame.add.sprite(x, y, configSprite.fileName+type);
    rune.anchor.set(0.5);
    rune.width = configSprite.size.width;
    rune.height = configSprite.size.height;
    rune.visible = true;
    rune.inputEnabled = inputEnabled || false;

    for (let animationName in configSprite.animations) {
      rune.animations.add(animationName, configSprite.animations[animationName]);
    }
    let firstAnimation = Object.keys(configSprite.animations)[0];
    rune.animations.play(firstAnimation, configSprite.animations[firstAnimation].length, true);

    return rune;
  }

  renderBoard(board, configSpriteRune, inputEnabled, marginRune, marginBoardX, marginBoardY) {
    this.board = [];
    this.groupBoard = this.linkGame.add.group();

    this.marginRune   = marginRune   || configSpriteRune.size.width/10;
    this.marginBoardX = marginBoardX || 150;
    this.marginBoardY = marginBoardY || 150;

    for (let i = 0; i < board.length; i++) {
      this.board[i] = [];
      for (let j = 0; j < board[i].length; j++) {
        this.board[i][j] = this.renderRune(
          board[i][j].type,
          this.marginBoardX + j * (configSpriteRune.size.width + this.marginRune),
          this.marginBoardY + i * (configSpriteRune.size.height + this.marginRune),
          configSpriteRune,
          inputEnabled
        );
        if (inputEnabled) {
          for (let eventName in configSpriteRune.events) {
            this.board[i][j].events[eventName].add(this.linkGame[ configSpriteRune.events[eventName] ], this.linkGame, 0, {i:i, j:j});
          };
        }
        this.groupBoard.add(this.board[i][j]);
        this.groupBoard.alpha = 0;
      }
    }

    let tween = this.linkGame.add
      .tween(this.groupBoard)
      .to({
        alpha: 1
      },
      100,
      Phaser.Easing.Linear.None,
      true
    );
    
    return tween;
  }

  renderSwap(coordRuneOne, coordRuneTwo) {

    // исправить хак на пареметры события
    this.board[coordRuneOne[0]][coordRuneOne[1]].events.onInputDown["_bindings"][0]["_args"][0] = {i:coordRuneTwo[0], j:coordRuneTwo[1]};
    this.board[coordRuneTwo[0]][coordRuneTwo[1]].events.onInputDown["_bindings"][0]["_args"][0] = {i:coordRuneOne[0], j:coordRuneOne[1]};

    let tmp = this.board[coordRuneOne[0]][coordRuneOne[1]];
    this.board[coordRuneOne[0]][coordRuneOne[1]] = this.board[coordRuneTwo[0]][coordRuneTwo[1]];
    this.board[coordRuneTwo[0]][coordRuneTwo[1]] = tmp;

    this.linkGame.add
      .tween(this.board[coordRuneOne[0]][coordRuneOne[1]])
      .to({
        x: this.board[coordRuneTwo[0]][coordRuneTwo[1]].x,
        y: this.board[coordRuneTwo[0]][coordRuneTwo[1]].y
      },
      30,
      Phaser.Easing.Linear.None, 
      true
    );

    let lastTween = this.linkGame.add
      .tween(this.board[coordRuneTwo[0]][coordRuneTwo[1]])
      .to({
        x: this.board[coordRuneOne[0]][coordRuneOne[1]].x,
        y: this.board[coordRuneOne[0]][coordRuneOne[1]].y
      }, 
      30, 
      Phaser.Easing.Linear.None,
      true
    );

    return lastTween;
  }

  renderDel(toDel) {
    let tween = {};
    let groupDelRune = this.linkGame.add.group();

    for (let i = 0; i < toDel.length; i++) {
      groupDelRune.add(this.board[toDel[i][0]][toDel[i][1]]);
    }

    tween = this.linkGame.add
      .tween(groupDelRune)
      .to({
        alpha: 0
      },
      100,
      Phaser.Easing.Linear.None,
      true
    );

    return tween
  }

  // TODO УЖАС
  // [i, j, type], configSprite
  renderRefill(toFill, configSpriteRune) {
    let tween = {};
    let groupFillRune = this.linkGame.add.group();

    for (let i = 0; i < toFill.length; i++) {

      let rune = this.renderRune(
        toFill[i][2], 
        this.board[toFill[i][0]][toFill[i][1]].x,
        this.board[toFill[i][0]][toFill[i][1]].y,//-(this.board[toFill[i][0]][toFill[i][1]].y+this.marginRune),
        configSpriteRune, 
        true
      );

      this.board[toFill[i][0]][toFill[i][1]].destroy();
      this.board[toFill[i][0]][toFill[i][1]] = rune;

      for (let eventName in configSpriteRune.events) {
        this.board[toFill[i][0]][toFill[i][1]].events[eventName].add(this.linkGame[ configSpriteRune.events[eventName] ], this.linkGame, 0, {i:[i][0], j:[i][1]});
      };

      groupFillRune.add(rune);
    }

    tween = this.linkGame.add
      .tween(groupFillRune)
      .to({
        alpha: 1,
        //y: this.board[toFill[i][0]][toFill[i][1]].y+this.board[toFill[i][0]][toFill[i][1]].y+this.marginRune
      },
      300,
      Phaser.Easing.Linear.None,
      true
    );

    return tween
  }

};
