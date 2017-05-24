class Rune {

  constructor(type) {
    this.type = type;
  }

  viewCreate(x, y, configSprite, visible, inputEnabled) {
    this.texture = game.add.sprite(x, y, configSprite.fileName+this.type);
    this.texture.anchor.set(0.5);
    this.texture.width = configSprite.size.width;
    this.texture.height = configSprite.size.height;
    for (let animationName in configSprite.animations) {
      this.texture.animations.add(animationName, configSprite.animations[animationName]);
    }
    if (visible) {
      this.texture.visible = true;
      let firstAnimation = Object.keys(configSprite.animations)[0];
      this.texture.animations.play(firstAnimation, configSprite.animations[firstAnimation].length, true);
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