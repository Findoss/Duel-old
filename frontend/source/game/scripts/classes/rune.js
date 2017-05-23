class Rune {

  constructor(type) {
    this.type = type;
  }

  viewCreate(x, y, sprite, state, inputEnabled) {
    this.texture = game.add.sprite(x, y, sprite);
    this.texture.anchor.set(0.5);
    this.texture.width = textureRune.size.width;
    this.texture.height = textureRune.size.height;
    for (let animationName in textureRune.animations) {
      this.texture.animations.add(animationName, textureRune.animations[animationName]);
    }
    if (state) {
      this.texture.visible = true;
      this.texture.animations.play(state, textureRune.animations[state].length, true);
    } else {
      this.texture.visible = false;
    }
    this.texture.inputEnabled = inputEnabled || false;
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
    });*/