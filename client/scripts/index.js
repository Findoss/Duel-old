/* globals Phaser, configPhaser, Boot, Preloader, MainMenu, testBoard4, PlayGame */

let param = {
  board: testBoard5
}

class Game extends Phaser.Game {
  constructor () {
    super(configPhaser)

    // this.state.add('Boot', Boot);
    // this.state.add('Preloader', Preloader);
    // this.state.add('MainMenu', MainMenu);
    // this.state.add('PlayGame', PlayGame, false)
    this.state.add('Sandbox', Sandbox, false)

    // this.state.start('Boot');
    // стартуем сцену временно это песочница
    // (очистка мира, очистка кеша, параметры)
    this.state.start('Sandbox', true, false, param)
  }
}

let game = new Game()
