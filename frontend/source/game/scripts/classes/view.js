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

    // del +++
    DEBUG && this.linkGame.add.text(
      x-10, 
      y-15, 
      type, {
        font: "30px Arial",
        fill: "#fff",
        align: "center" 
      }
    );
    // del ---

    return rune;
  }

  renderBoard(board, configSpriteRune, inputEnabled, marginRune, marginBoardX, marginBoardY) {

    this.board = [];
    this.groupBoard = this.linkGame.add.group();

    this.marginRune   = marginRune   || configSpriteRune.size.width/10;
    this.marginBoardX = marginBoardX || 150;
    this.marginBoardY = marginBoardY || 150;

    if (board.length && board[0].length) {
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

          // del +++
          DEBUG && this.linkGame.add.text(
            this.marginBoardX + j * (configSpriteRune.size.width + this.marginRune)-40, 
            this.marginBoardY + i * (configSpriteRune.size.height + this.marginRune)-45, 
            i+"x"+j, {
              font: "20px Arial",
              fill: "#fff",
              align: "center" 
            }
          );
          // del ---
        }
      }
    }

    // del +++
    DEBUG && this.linkGame.add.tween(
      this.groupBoard).to({
        alpha: 1
      }, 
      2000, 
      Phaser.Easing.Linear.None, 
      true
    ).onComplete.add(() => {
      //this.linkGame.ANIM = true;
      //this.groupBoard.destroy();
    });
    // del ---

    return this;
  }

  renderSwapRune(runeOne, runeTwo) {
    this.linkGame.add.tween(
      this.board[runeOne.i][runeOne.j]).to({
        x: this.board[runeTwo.i][runeTwo.j].x,
        y: this.board[runeTwo.i][runeTwo.j].y
      },
      800,
      Phaser.Easing.Linear.None, 
      true
    );

    this.linkGame.add.tween(
      this.board[runeTwo.i][runeTwo.j]).to({
        x: this.board[runeOne.i][runeOne.j].x,
        y: this.board[runeOne.i][runeOne.j].y
      }, 
      800, 
      Phaser.Easing.Linear.None, 
      true
    );

    this.board[runeOne.i][runeOne.j].events.onInputDown["_bindings"][0]["_args"][0] = {i:runeTwo.i, j:runeTwo.j};
    this.board[runeTwo.i][runeTwo.j].events.onInputDown["_bindings"][0]["_args"][0] = {i:runeOne.i, j:runeOne.j};
  }

};


  /*
      game.add.tween(this.texture).to({
        x: this.col*110,
        y: this.row*110,
      }, 
      4, Phaser.Easing.Linear.None, true)
      .onComplete.add(function(){
        //
      });
  */
