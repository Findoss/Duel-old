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

    /*
    this.linkGame.add.text(x-10, y-15, type, {
      font: "30px Arial",
      fill: "#fff",
      align: "center" 
    });
    */
    return rune;
  }

  renderBoard(board, configSpriteRune, marginRune, marginBoardX, marginBoardY) {

    // .board 
    this.board = [];
    //this.grup = {};

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
            true
          );
          for (let eventName in configSpriteRune.events) {
            this.board[i][j].events[eventName].add(this.linkGame[ configSpriteRune.events[eventName] ], this.linkGame, 0, {i:i, j:j});
          }
        }
      }
    }
    return this;
  }

};




    //this.texture.animations.play(state, textureRune.animations[state].length, true);
    //this.onNewType = new Phaser.Signal();
    //this.onNewType.dispatch(this);

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
