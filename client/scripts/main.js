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
    // this.state.add('Sandbox', Sandbox, false)
    this.state.add('PlayGame', PlayGame, false)

    // this.state.start('Boot');
    // this.state.start('PlayGame', true, false, param)
    this.state.start('PlayGame', true, false, param)
  }
}

let game = new Game()