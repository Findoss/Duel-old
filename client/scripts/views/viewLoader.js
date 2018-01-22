/* globals Phaser */
const View = require('../views/view');

class ViewLoader extends View {
  constructor(game, configSpriteLoader) {
    super(game);
    this.configSpriteLoader = configSpriteLoader;
    this.loader = null;
    this.loaderTween = null;
  }

  renderLoder() {
    const loader = this.linkGame.add.image(60, 80, this.configSpriteLoader.fileName);
    loader.anchor.set(0.5);
    loader.width = this.configSpriteLoader.size.width;
    loader.height = this.configSpriteLoader.size.height;

    const tween = this.linkGame.add
      .tween(loader)
      .to({ angle: 360 }, this.multiplierSpeedAnimation * 1500, Phaser.Easing.Linear.None, true, 0, -1);
    this.loader = loader;
    this.loaderTween = tween;
    return tween;
  }

  cleanLoder() {
    this.loaderTween.stop();
    this.loaderTween = null;
    this.loader.destroy();
    this.loader = null;
  }
}

module.exports = ViewLoader;
