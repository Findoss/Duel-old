class View {
  constructor(game) {
    /**
     * Ссылка на игровую сцену
     * @type {Phaser.State}
     */
    this.linkGame = game;
    /**
     * Множитель скорости анимации
     * @type {Number}
     * @default 1
     */
    this.multiplierSpeedAnimation = 1;
  }
}

module.exports = View;
