/* globals Phaser */
/**
 * asd
 */
class ViewLoader {
  constructor(game, configSpriteLoader) {
    this.linkGame = game;
    this.multiplierSpeedAnimation = 1;
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
