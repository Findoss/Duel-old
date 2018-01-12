/* globals Phaser */
const config = require('./configs/game_container.js')
const Sandbox = require('./states/sandbox')

let param = {
  board: []
}

class Game extends Phaser.Game {
  constructor (config) {
    super(config)

    // this.state.add('PlayGame', PlayGame, false)
    this.state.add('Sandbox', Sandbox, false)

    // стартуем сцену временно это песочница
    // (очистка мира, очистка кеша, параметры)
    this.state.start('Sandbox', true, false, param)
  }
}

window.game = new Game(config)
