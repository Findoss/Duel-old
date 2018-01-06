/* globals Phaser */
import config from './configs/phaser'
import Sandbox from './states/sandbox'

let param = {
  board: []
}

class Game extends Phaser.Game {
  constructor () {
    super(config)

    // this.state.add('PlayGame', PlayGame, false)
    this.state.add('Sandbox', Sandbox, false)

    // стартуем сцену временно это песочница
    // (очистка мира, очистка кеша, параметры)
    this.state.start('Sandbox', true, false, param)
  }
}

window.game = new Game()
