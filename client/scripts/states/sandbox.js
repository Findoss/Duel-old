/* globals Phaser, game */
const IO = require('socket.io-client');
const log = require('../../../libs/log');

const Utils = require('../utils');

const configTextures = require('../configs/textures');
const textureSuggestion = require('../textures/suggestion');
const textureLoader = require('../textures/loader');
const textureRune = require('../textures/rune');

const Queue = require('../views/queue');
const ViewBoard = require('../views/viewBoard');
const ViewLoader = require('../views/viewLoader');

const scenarios = require('../scenarios/index');

class Sandbox extends Phaser.State {
  constructor() {
    super();
    this.socket = new IO('http://localhost:8080');
  }

  init() {
    // отрисовывка в фоне
    game.stage.disableVisibilityChange = true;
    // влючаем время для вывода FPS
    this.game.time.advancedTiming = true;
    // влючаем возможность разворачивать на весь экран F11
    this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;

    // this break point
    // sessionStorage.setItem('myName', 'Tom');

    //
    this.name = sessionStorage.getItem('myName')
    this.idRoom = window.location.pathname.replace('/', '');
    this.activeRune = null;
    this.queue = new Queue();
    this.playerLeft = 'ooo'
    this.playerRight = 'xxx'
    this.step = '='
    this.viewBoard = new ViewBoard(this, textureRune, textureSuggestion);
    this.viewLoader = new ViewLoader(this, textureLoader);
  }

  preload() {
    // загрузка спинера
    this.game.load.image(
      textureLoader.fileName,
      configTextures.path + configTextures.skin + textureLoader.fileName + configTextures.ext,
    );

    // загрузка руки (подсказка)
    this.game.load.image(
      textureSuggestion.fileName,
      configTextures.path + configTextures.skin + textureSuggestion.fileName + configTextures.ext,
    );

    // загрузка рун
    for (let i = 0; i < 6; i++) {
      this.game.load.spritesheet(
        textureRune.fileName + i,
        configTextures.path + textureRune.fileName + i + configTextures.ext,
        textureRune.size.width,
        textureRune.size.height,
        12,
      );
    }
  }

  create() {
    this.bindEvents();
    if (this.idRoom !== '') {
      this.socket.emit('game/connect', this.idRoom);
    } else {
      this.socket.emit('lobby/ready', this.name);
    }
  }

  update() {
    Utils.resizeGame(this.game);
  }

  render() {
    Utils.fps(this.game);
    game.debug.text(this.playerLeft.name, 150, 30, '#ffffff', '25px Arial');
    game.debug.text(this.step, 250, 30, '#ffffff', '25px Arial');
    game.debug.text(this.playerRight.name, 300, 30, '#ffffff', '25px Arial');
  }

  runeClick(rune) {
    scenarios.cleanSuggestion(this)();
    this.viewBoard.blockBoard();
    if (this.activeRune !== null) {
      if (this.activeRune !== rune) {
        if (Utils.isAdjacent(rune.coord, this.activeRune.coord)) {
          this.socket.emit('board/swap', this.idRoom, this.name, rune.coord, this.activeRune.coord);
          scenarios.makeInactiveRune(this)();
        } else {
          scenarios.makeInactiveRune(this)();
          scenarios.makeActiveRune(this)(rune);
          this.viewBoard.unblockBoard();
        }
      } else {
        scenarios.makeInactiveRune(this)();
        this.viewBoard.unblockBoard();
        this.socket.emit('board/suggestion', this.idRoom);
      }
    } else {
      scenarios.makeActiveRune(this)(rune);
      this.viewBoard.unblockBoard();
    }
    // hack
    this.viewBoard.unblockBoard();
  }

  runeOver(rune) {
    if (rune !== this.activeRune) {
      rune.animations.play('focus', 1, true);
    }
  }

  runeOut(rune) {
    if (rune !== this.activeRune) {
      rune.animations.play('wait', 4, true);
    }
  }

  bindEvents() {
    this.socket.on('changes', (changes) => {
      changes.forEach(({ event, data }) => {
        scenarios[event](this)(data);
      });
    });

    this.socket.on('msg', (msg) => {
      log('client', msg);
    });
  }

  setActiveRune(rune) {
    this.activeRune = rune;
  }

  setIdRoom(id) {
    this.idRoom = id;
    window.history.pushState(null, null, '/'+this.idRoom);
  }
}

module.exports = Sandbox;
