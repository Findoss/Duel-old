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

    // del +++
    return [
      this.linkGame.add.tween(
        this.groupBoard).to({
          alpha: 1
        },
        1000,
        Phaser.Easing.Linear.None,
        false
      )
    ];
  }

  renderSwap(coordRuneOne, coordRuneTwo) {

    console.log("рендр свап");

    console.log(this.board[coordRuneTwo[0]][coordRuneTwo[1]].x);

    let tweenGroup = [];

    console.log(this.board[coordRuneOne[0]][coordRuneOne[1]]);

    //console.log(coordRuneOne[0]+"x"+coordRuneOne[1])
    //console.log(this.board[coordRuneOne[0]][coordRuneOne[1]].position);

    //console.log(coordRuneTwo[0]+"x"+coordRuneTwo[1])
    //console.log(this.board[coordRuneTwo[0]][coordRuneTwo[1]].position);

    tweenGroup.push(this.linkGame.add.tween(
      this.board[coordRuneOne[0]][coordRuneOne[1]]).to({
        x: this.board[coordRuneTwo[0]][coordRuneTwo[1]].x,
        y: this.board[coordRuneTwo[0]][coordRuneTwo[1]].y
      },
      300,
      Phaser.Easing.Linear.None, 
      false
    ));

    tweenGroup.push(this.linkGame.add.tween(
      this.board[coordRuneTwo[0]][coordRuneTwo[1]]).to({
        x: this.board[coordRuneOne[0]][coordRuneOne[1]].x,
        y: this.board[coordRuneOne[0]][coordRuneOne[1]].y
      }, 
      300, 
      Phaser.Easing.Linear.None,
      false
    ));

    tweenGroup[1].onComplete.add(() => {
        console.log("свап++");
      this.board[coordRuneOne[0]][coordRuneOne[1]].events.onInputDown["_bindings"][0]["_args"][0] = {i:coordRuneTwo[0], j:coordRuneTwo[1]};
      this.board[coordRuneTwo[0]][coordRuneTwo[1]].events.onInputDown["_bindings"][0]["_args"][0] = {i:coordRuneOne[0], j:coordRuneOne[1]};

      let tmp = this.board[coordRuneOne[0]][coordRuneOne[1]];
      this.board[coordRuneOne[0]][coordRuneOne[1]] = this.board[coordRuneTwo[0]][coordRuneTwo[1]];
      this.board[coordRuneTwo[0]][coordRuneTwo[1]] = tmp;
    });

    return tweenGroup
  }

  renderDel(board) {
    let tweenGroup = [];
    for (var i = 0; i < this.board.length; i++) {
      for (var j = 0; j < this.board[i].length; j++) {
        if (board[i][j].type == 0) {
          tweenGroup.push(this.linkGame.add.tween(
            this.board[i][j]).to({
              alpha: 0
            },
            300,
            Phaser.Easing.Linear.None, 
            false
          ));
        }
      }
    }
    return tweenGroup
  }

};
