class Rune {

  constructor(row, col, type, state, sprite) {
    //
    this.row = row;
    this.col = col;
    this.type = type;


    this.texture = game.add.sprite(col*110, row*110, sprite+type);
    this.texture.anchor.set(0.5);
    this.texture.width = textureRune.size.width;
    this.texture.height = textureRune.size.height;

    for (let animationName in textureRune.animations) {
      this.texture.animations.add(animationName, textureRune.animations[animationName]);
    }
    this.state = this.texture.animations.play(state, textureRune.animations[state].length, true);
    
    this.texture.inputEnabled = true;

    //this.onNewType = new Phaser.Signal();
    //this.onNewType.dispatch(this);
  }

};