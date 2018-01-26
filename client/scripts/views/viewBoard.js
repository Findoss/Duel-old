/* globals Phaser */
const View = require('../views/view');

class ViewBoard extends View {
  /**
   * Конструктор объекта поля (визуальное)
   * @constructor
   * @param  {Phaser.State}  game             Ссылка на игровую сцену
   * @param  {Config.Sprite} configSpriteRune Конфигурация спрайта-руны
   * @param  {Number=}       marginRune       Отступ между рунами
   * @param  {Number=}       marginBoardX     Отступ от края экрана по оси Х
   * @param  {Number=}       marginBoardY     Отступ от края экрана по оси Y

   */
  constructor(game, configSpriteRune, configSuggestion, marginRune = 10, marginBoardX = 100, marginBoardY = 100) {
    super(game);
    /**
     * Игровое поле спрайтов-рун
     * @type {Array.<rune>}
     */
    this.board = [];
    /**
     * Массив анимаций-подсказок
     * @type {Array.<Phaser.Tween>}
     */
    this.tweensSuggestion = [];
    /**
     * Группа спрайтов-рун
     * @type {Phaser.Group}
     */
    this.groupBoard = this.linkGame.add.group();
    /**
     * Группа спрайтов-подсказок
     * @type {Phaser.Group}
     */
    this.groupSuggestion = this.linkGame.add.group();
    /**
     * Отступ между рунами
     * @type {Number}
     * @default 10
     */
    this.marginRune = marginRune;
    /**
     * Отступ от края экрана по оси Х
     * @type {Number}
     * @default 100
     */
    this.marginBoardX = marginBoardX;
    /**
     * Отступ от края экрана по оси Y
     * @type {Number}
     * @default 100
     */
    this.marginBoardY = marginBoardY;
    /**
     * Конфигурация спрайта-руны
     * @type {json}
     */
    this.configSpriteRune = configSpriteRune;
    /**
     * Конфигурация спрайта-руки
     * @type {json}
     */
    this.configSuggestion = configSuggestion;
  }

  /**
   * Удаляет спрайт-руны `board.rune`
   * @param  {Array.<coordRune>} coordRunes Координаты рун
   */
  cleanRunes(coordRunes) {
    for (let l = 0; l < coordRunes.length; l++) {
      this.board[coordRunes[l].i][coordRunes[l].j].destroy();
    }
  }

  /**
   * Останавливает все анимации подсказок (`tweensSuggestion`) и удаляет объкты (`groupSuggestion`)
   */
  cleanSuggestion() {
    this.tweensSuggestion.forEach(tween => tween.stop());
    this.tweensSuggestion = [];
    this.groupSuggestion.destroy();
    this.groupSuggestion = this.linkGame.add.group();
  }

  /**
   * Создает спрайт-руны
   * **! ВАЖНО** Предварительно в разделе `create` надо загрузить (`this.game.load`) спрайт
   * **! ВАЖНО** Используется только в пределах класса
   * @protected
   * @param    {Number}            i                                      Номер строки
   * @param    {Number}            j                                      Номер колонки
   * @param    {Number}            type                                   Тип руны
   * @property {Number}            x=posXRune(j)                          Координата по Х
   * @property {Number}            y=posYRune(i)*-1                       Координата по Y
   * @property {Boolean}           inputEnabled=false                     Доступность для взаимодействия
   * @property {Phaser.Point}      anchor=0.5(середина)                   Точка вращения
   * @property {Number}            width=configSpriteRune.size.width      Ширина
   * @property {Number}            height=configSpriteRune.size.width     Высота
   * @property {Phaser.Animation}  animations=configSpriteRune.animations Анимации
   * @property {Phaser.Event}      events=configSpriteRune.events         События
   * @return   {Phaser.Sprite}     Спрайт-руны
   */
  initRune(i, j, type) {
    const rune = this.linkGame.add.sprite(this.posXRune(j), this.posYRune(i) * -1, this.configSpriteRune.fileName + type);
    rune.width = this.configSpriteRune.size.width - 50;
    rune.height = this.configSpriteRune.size.height - 50;
    rune.inputEnabled = false;
    rune.anchor.set(0.5);
    rune.coord = { i, j };
    if (this.configSpriteRune.animations !== undefined) {
      for (const animationName in this.configSpriteRune.animations) {
        rune.animations.add(animationName, this.configSpriteRune.animations[animationName]);
      }
      const firstAnimation = Object.keys(this.configSpriteRune.animations)[0];
      rune.animations.play(firstAnimation, this.configSpriteRune.animations[firstAnimation].length, true);
    }
    for (const eventName in this.configSpriteRune.events) {
      rune.events[eventName].add(this.linkGame[this.configSpriteRune.events[eventName]], this.linkGame);
    }
    return rune;
  }

  /**
   * Возвращает координату руны по оси X (горизонт)
   * FORMULA `j * (this.configSpriteRune.size.width + this.marginRune) + this.marginBoardX`
   * @param  {Number} j Номер колонки
   * @return {Number}
   */
  posXRune(j) {
    return j * (this.configSpriteRune.size.width - 50 + this.marginRune) + this.marginBoardX;
  }

  /**
   * Возвращает координату руны по оси Y (вертикаль)
   * FORMULA `i * (this.configSpriteRune.size.height + this.marginRune) + this.marginBoardY`
   * @param  {Number} i Номер строки
   * @return {Number}
   */
  posYRune(i) {
    return i * (this.configSpriteRune.size.height - 50 + this.marginRune) + this.marginBoardY;
  }

  /**
   * Отрисовывает все подсказки для возможных ходов
   * @param  {Array.Array.<coordAndTypeRune>} coordRunes             Массив пар координат рун
   * @return {Phaser.Tween} Анимация подсказки
   */
  renderAllSuggestion(coordRunes) {
    let tween = {};
    for (let l = 0; l < coordRunes.length; l++) {
      tween = this.renderSuggestion(coordRunes[l].coordRuneO, coordRunes[l].coordRuneX);
    }
    return tween;
  }

  /**
   * Отрисовывает игровое поле, после чего делает все руны (`groupBoard`) доступными для взаимодействия
   * FORMULA `delay = (80 * (board.length - i + 1)) + j * -10)`
   * @param  {Array.Array.Number} board Игровое поле
   * @return {Phaser.Tween} Последняя анимация функции
   */
  renderBoard(board) {
    let lastTween = {};
    for (let i = board.length - 1; i >= 0; i--) {
      this.board[i] = [];
      for (let j = board[i].length - 1; j >= 0; j--) {
        lastTween = this.renderRunes([{ i, j, type: board[i][j] }], 100, (80 * (board.length - i + 1)) + j * -10);
      }
    }
    return lastTween;
  }

  /**
   * Отрисовывает удаление игрового поля (`groupBoard`) и удаляет массив `board` и вподсказки `cleanSuggestion()`
   * @todo доделать анимацию
   */
  renderDeleteBoard() {
    this.groupBoard.pivot.set(450, 450);
    this.groupBoard.position.set(450, 450);
    const tween = this.linkGame.add
      .tween(this.groupBoard)
      .to({
        y: this.posXRune(this.board.length) * 2,
        alpha: 0,
      }, this.multiplierSpeedAnimation * 200, Phaser.Easing.Linear.None, true);
    tween.onComplete.add(() => {
      this.board = [];
      this.groupBoard.destroy();
      this.groupBoard = this.linkGame.add.group();
      this.cleanSuggestion();
    });
    return tween;
  }

  /**
   * Отрисовывает удаление рун
   * @todo доделать анимацию (вынести за перелы цикла)
   * @param  {Array.coordRune} coordRunes Координаты рун
   * @return {Phaser.Tween} Анимация удаления
   */
  renderDeleteRunes(coordRunes) {
    const groupDeleleteRunes = this.linkGame.add.group();

    for (let l = 0; l < coordRunes.length; l++) {
      groupDeleleteRunes.add(this.board[coordRunes[l].i][coordRunes[l].j]);
      this.board[coordRunes[l].i][coordRunes[l].j].animations.play('destroy', 12, true);

      this.linkGame.add
        .tween(this.board[coordRunes[l].i][coordRunes[l].j].scale)
        .to({
          x: 2,
          y: 2,
        }, this.multiplierSpeedAnimation * 100, Phaser.Easing.Linear.None, true);
    }

    const lastTween = this.linkGame.add
      .tween(groupDeleleteRunes)
      .to({
        alpha: 0,
      }, this.multiplierSpeedAnimation * 200, Phaser.Easing.Linear.None, true);
    return lastTween;
  }

  /**
   * Отрисовывает падение рун
   * @param  {Array.<coordRune>} coordRunes Координаты рун
   * @return {Phaser.Tween} Последняя анимация падения
   */
  renderDrop(coordRunes) {
    let lastTween = {};
    for (let l = this.board.length - 1; l >= 0; l--) {
      for (let i = 0; i < coordRunes.length; i++) {
        if (l === coordRunes[i][0].i) {
          lastTween = this.renderSwap(coordRunes[i][0], coordRunes[i][1], 120);
        }
      }
    }
    return lastTween;
  }

  /**
   * Отрисовывает пополнение поля
   * @param  {Array.<coordRune>} coordRunes Координаты рун
   * @return {Phaser.Tween} Анимация пополнения
   */
  renderRefill(coordRunes) {
    this.cleanRunes(coordRunes);
    const tween = this.renderRunes(coordRunes, 120, 50);
    return tween;
  }

  /**
   * Отрисовывает руны
   * FORMULA `y =  posYRune(i)`
   * @param  {Array.<coordAndTypeRune>} runes          Руны
   * @param  {Number=}                  speedAnimation Скорость анимации
   * @param  {Number=}                  delayAnimation Задержка анимации
   * @param  {Boolean=}                 autoStart      Автоматический старт анимации
   * @return {Phaser.Tween} Анимация появления руны
   * @example
   * let rune = {i: 1, j: 1, type: 3}
   * this.renderRunes([rune])
   */
  renderRunes(runes, speedAnimation = 500, delayAnimation = 0, autoStart = true) {
    let tween = {};
    for (let l = runes.length - 1; l >= 0; l--) {
      const rune = this.initRune(runes[l].i, runes[l].j, runes[l].type);

      for (const eventName in this.configSpriteRune.events) {
        rune.events[eventName].add(this.linkGame[this.configSpriteRune.events[eventName]], this.linkGame, 0, { i: runes[l].i, j: runes[l].j });
      }

      this.board[runes[l].i][runes[l].j] = rune;
      this.groupBoard.add(rune);

      tween = this.linkGame.add
        .tween(rune)
        .to({
          y: this.posYRune(runes[l].i),
        }, this.multiplierSpeedAnimation * speedAnimation, Phaser.Easing.Sinusoidal.Out, autoStart, delayAnimation);
    }
    return tween;
  }

  /**
   * Отрисовывет с задержкой подсказду для возможного хода, анимация состоит из 2 частей
   * **! ВАЖНО** предварительно в разделе `create` надо загрузить (`this.game.load`) изображение
   * @param    {coordRune}     coordRuneOne                              Координата первой руны
   * @param    {coordRune}     coordRuneTwo                              Координата второй руны
   * @param    {Number=}       delayShow                                 Задержка показа подсказки
   * @property {Number}        x=posXRune(coordRuneOne.j)                Координата по Х
   * @property {Number}        y=posYRune(coordRuneOne.i)                Координата по Y
   * @property {Number}        width=configSuggestion.size.width   Ширина
   * @property {Number}        height=configSuggestion.size.height Высота
   * @property {Number}        alpha=0                                   Прозрачность
   * @property {Phaser.Point}  anchor=0.1                                Точка вращения
   * @return {Phaser.Tween} Анимация передвежения подсказки
   */
  renderSuggestion(coordRuneOne, coordRuneTwo, delayShow = 3500) {
    const suggestion = this.linkGame.add.image(0, 0, this.configSuggestion.fileName);
    suggestion.anchor.set(0.1);
    suggestion.width = this.configSuggestion.size.width;
    suggestion.height = this.configSuggestion.size.height;
    suggestion.alpha = 0;
    suggestion.x = this.posXRune(coordRuneOne.j);
    suggestion.y = this.posYRune(coordRuneOne.i);

    this.groupSuggestion.add(suggestion);

    const tweenShow = this.linkGame.add
      .tween(suggestion)
      .to({
        alpha: 0.7,
      }, this.multiplierSpeedAnimation * 300, Phaser.Easing.Linear.None, true, delayShow);
    const tween = this.linkGame.add
      .tween(suggestion)
      .to({
        x: this.posXRune(coordRuneTwo.j),
        y: this.posYRune(coordRuneTwo.i),
      }, this.multiplierSpeedAnimation * 1000, Phaser.Easing.Linear.None, true, 500, -1, true);
    tweenShow.chain(tween);
    this.tweensSuggestion.push(tween);
    return tween;
  }

  /**
   * Отрисовывет обмен рун
   * @param  {coordRune} coordRuneOne   Координата первой руны
   * @param  {coordRune} coordRuneTwo   Координата второй руны
   * @param  {Number=}   speedAnimation Скорость анимации
   * @param  {Number=}   delayAnimation Задержка анимации
   * @return {Phaser.Tween} Анимация обмена рун
   */
  renderSwap(coordRuneOne, coordRuneTwo, speedAnimation = 500, delayAnimation = 0) {
    this.linkGame.add
      .tween(this.board[coordRuneOne.i][coordRuneOne.j])
      .to({
        x: this.posXRune(coordRuneTwo.j),
        y: this.posYRune(coordRuneTwo.i),
      }, this.multiplierSpeedAnimation * speedAnimation, Phaser.Easing.Linear.None, true, delayAnimation);
    const lastTween = this.linkGame.add
      .tween(this.board[coordRuneTwo.i][coordRuneTwo.j])
      .to({
        x: this.posXRune(coordRuneOne.j),
        y: this.posYRune(coordRuneOne.i),
      }, this.multiplierSpeedAnimation * speedAnimation, Phaser.Easing.Linear.None, true, delayAnimation);
    this.swap(coordRuneOne, coordRuneTwo);
    return lastTween;
  }

  /**
   * Ообмен спрайт-рун
   * **! ВАЖНО** Используется только в пределах класса
   * @protected
   * @param  {coordRune} coordRuneOne Координата первой руны
   * @param  {coordRune} coordRuneTwo Координата второй руны
   */
  swap(coordRuneOne, coordRuneTwo) {
    this.board[coordRuneOne.i][coordRuneOne.j].coord = { i: coordRuneTwo.i, j: coordRuneTwo.j };
    this.board[coordRuneTwo.i][coordRuneTwo.j].coord = { i: coordRuneOne.i, j: coordRuneOne.j };

    const tmp = this.board[coordRuneOne.i][coordRuneOne.j];
    this.board[coordRuneOne.i][coordRuneOne.j] = this.board[coordRuneTwo.i][coordRuneTwo.j];
    this.board[coordRuneTwo.i][coordRuneTwo.j] = tmp;
  }

  /**
   * Рaзблокирует взаимодействие с рунами (`groupBoard`)
   */
  unblockBoard() {
    this.groupBoard.setAll('tint', '0xffffff');
    this.groupBoard.setAll('inputEnabled', true);
  }

  /**
   * Блокирует взаимодействие с рунами (`groupBoard`)
   */
  blockBoard() {
    this.groupBoard.setAll('tint', '0x888888');
    this.groupBoard.setAll('inputEnabled', false);
  }
}

module.exports = ViewBoard;
