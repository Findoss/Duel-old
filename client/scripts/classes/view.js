/* globals Phaser, textureRune */
/**
 * todo Визуальное представление игрового поля
 *
 * Префикс методов | Назначение
 * :---------------|:--------------------
 * init            | создают объкты
 * render          | отрисовывают объкты
 * clean           | стирают объкты
 *
 *
 * {@link http://easings.net/ru#easeOutBounce | Шпаргалка по функциям плавности анимации }
 * @class
 * @fires View
 */
class View {
  /**
   * Конструктор объекта поля (визуальное)
   * @constructor
   * @param  {Phaser.State}  game             Ссылка на игровую сцену
   * @param  {Config.Sprite} configSpriteRune Конфигурация спрайта-руны
   * @param  {Number=}       marginRune       Отступ между рунами
   * @param  {Number=}       marginBoardX     Отступ от края экрана по оси Х
   * @param  {Number=}       marginBoardY     Отступ от края экрана по оси Y

   */
  constructor (game, configSpriteRune, marginRune = 10, marginBoardX = 100, marginBoardY = 100) {
    /**
     * Ссылка на игровую сцену
     * @type {Phaser.State}
     */
    this.linkGame = game
    /**
     * Множитель скорости анимации
     * @type {Number}
     * @default 1
     */
    this.multiplierSpeedAnimation = 1
    /**
     * Игровое поле спрайтов-рун
     * @type {Array.<rune>}
     */
    this.board = []
    /**
     * Массив анимаций-подсказок
     * @type {Array.<Phaser.Tween>}
     */
    this.tweensSuggestion = []
    /**
     * Группа спрайтов-рун
     * @type {Phaser.Group}
     */
    this.groupBoard = this.linkGame.add.group()
    /**
     * Группа спрайтов-подсказок
     * @type {Phaser.Group}
     */
    this.groupSuggestion = this.linkGame.add.group()
    /**
     * Отступ между рунами
     * @type {Number}
     * @default 10
     */
    this.marginRune = marginRune
    /**
     * Отступ от края экрана по оси Х
     * @type {Number}
     * @default 100
     */
    this.marginBoardX = marginBoardX
    /**
     * Отступ от края экрана по оси Y
     * @type {Number}
     * @default 100
     */
    this.marginBoardY = marginBoardY
    /**
     * Конфигурация спрайта-руны
     * @type {json}
     */
    this.configSpriteRune = configSpriteRune
  }

  /**
   * Блокирует взаимодействие с рунами (`groupBoard`)
   */
  blockRunes () {
    this.groupBoard.setAll('inputEnabled', false)
  }

  /**
   * Удаляет спрайт-руны `board.rune`
   * @param  {Array.<coordRune>} coordRunes Координаты рун
   */
  cleanRunes (coordRunes) {
    for (let l = 0; l < coordRunes.length; l++) {
      this.board[coordRunes[l].i][coordRunes[l].j].destroy()
    }
  }

  /**
   * Останавливает все анимации подсказок (`tweensSuggestion`) и удаляет объкты (`groupSuggestion`)
   */
  cleanSuggestion () {
    this.tweensSuggestion.forEach((tween) => tween.stop())
    this.tweensSuggestion = []
    this.groupSuggestion.destroy()
    this.groupSuggestion = this.linkGame.add.group()
  }

  /**
   * Возвращает координаты руны в массиве
   * @param  {Phaser.Sprite} rune Спрайт-руны
   * @return {coordRune}
   */
  getIndexs (rune) {
    return rune.events.onInputDown['_bindings'][0]['_args'][0]
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
   * @return {Phaser.Sprite} Спрайт-руны
   */
  initRune (i, j, type) {
    let rune = this.linkGame.add.sprite(this.posXRune(j), this.posYRune(i) * -1, this.configSpriteRune.fileName + type)
    rune.width = this.configSpriteRune.size.width - 50
    rune.height = this.configSpriteRune.size.height - 50
    rune.inputEnabled = false
    rune.anchor.set(0.5)
    if (this.configSpriteRune.animations !== undefined) {
      for (let animationName in this.configSpriteRune.animations) {
        rune.animations.add(animationName, this.configSpriteRune.animations[animationName])
      }
      let firstAnimation = Object.keys(this.configSpriteRune.animations)[0]
      rune.animations.play(firstAnimation, this.configSpriteRune.animations[firstAnimation].length, true)
    }
    for (let eventName in this.configSpriteRune.events) {
      rune.events[eventName].add(this.linkGame[ this.configSpriteRune.events[eventName] ], this.linkGame, 0, {i: i, j: j})
    }
    return rune
  }

  /**
   * Возвращает координату руны по оси X (горизонт)
   * FORMULA `j * (this.configSpriteRune.size.width + this.marginRune) + this.marginBoardX`
   * @param  {Number} j Номер колонки
   * @return {Number}
   */
  posXRune (j) {
    return j * (this.configSpriteRune.size.width - 50 + this.marginRune) + this.marginBoardX
  }

  /**
   * Возвращает координату руны по оси Y (вертикаль)
   * FORMULA `i * (this.configSpriteRune.size.height + this.marginRune) + this.marginBoardY`
   * @param  {Number} i Номер строки
   * @return {Number}
   */
  posYRune (i) {
    return i * (this.configSpriteRune.size.height - 50 + this.marginRune) + this.marginBoardY
  }

  /**
   * Отрисовывает все подсказки для возможных ходов
   * @param  {Array.Array.<coordAndTypeRune>} coordRunes             Массив пар координат рун
   * @param  {Config.Sprite}                  configSuggestionSprite Конфигурация спрайта
   * @return {Phaser.Tween} Анимация подсказки
   */
  renderAllSuggestion (coordRunes, configSuggestionSprite) {
    let tween = {}
    for (var l = 0; l < coordRunes.length; l++) {
      tween = this.renderSuggestion(coordRunes[l].coordRuneOne, coordRunes[l].coordRuneTwo, configSuggestionSprite)
    }
    return tween
  }

  /**
   * Отрисовывает игровое поле, после чего делает все руны (`groupBoard`) доступными для взаимодействия
   * FORMULA `delay = (80 * (board.length - i + 1)) + j * -10)`
   * @param  {Array.Array.Number} board Игровое поле
   * @return {Phaser.Tween} Последняя анимация функции
   */
  renderBoard (board) {
    let lastTween = {}
    for (let i = board.length - 1; i >= 0; i--) {
      this.board[i] = []
      for (let j = board[i].length - 1; j >= 0; j--) {
        lastTween = this.renderRunes([{i, j, type: board[i][j]}], 100, (80 * (board.length - i + 1)) + j * -10)
      }
    }
    lastTween.onComplete.add(() => {
      this.groupBoard.setAll('inputEnabled', true)
    })
    return lastTween
  }

  /**
   * Отрисовывает удаление игрового поля (`groupBoard`) и удаляет массив `board` и вподсказки `cleanSuggestion()`
   * @todo доделать анимацию
   */
  renderDeleteBoard () {
    this.groupBoard.pivot.set(450, 450)
    this.groupBoard.position.set(450, 450)
    let tween = this.linkGame.add
      .tween(this.groupBoard)
      .to({
        y: this.posXRune(this.board.length) * 2,
        alpha: 0
      },
      this.multiplierSpeedAnimation * 200,
      Phaser.Easing.Linear.None,
      true
    )
    tween.onComplete.add(() => {
      this.board = []
      this.groupBoard.destroy()
      this.groupBoard = this.linkGame.add.group()
      this.cleanSuggestion()
    })
    return tween
  }

  /**
   * Отрисовывает удаление рун
   * @todo доделать анимацию (вынести за перелы цикла)
   * @param  {Array.coordRune} coordRunes Координаты рун
   * @return {Phaser.Tween} Анимация удаления
   */
  renderDeleteRunes (coordRunes) {
    let groupDeleleteRunes = this.linkGame.add.group()

    for (let l = 0; l < coordRunes.length; l++) {
      groupDeleleteRunes.add(this.board[coordRunes[l].i][coordRunes[l].j])
      this.board[coordRunes[l].i][coordRunes[l].j].animations.play('destroy', 12, true)

      this.linkGame.add
        .tween(this.board[coordRunes[l].i][coordRunes[l].j].scale)
        .to({
          x: 2,
          y: 2
        },
        this.multiplierSpeedAnimation * 100,
        Phaser.Easing.Linear.None,
        true
      )
    }

    let lastTween = this.linkGame.add
      .tween(groupDeleleteRunes)
      .to({
        alpha: 0
      },
      this.multiplierSpeedAnimation * 200,
      Phaser.Easing.Linear.None,
      true
    )
    return lastTween
  }

  /**
   * Отрисовывает падение рун
   * @param  {Array.<coordRune>} coordRunes Координаты рун
   * @return {Phaser.Tween} Последняя анимация падения
   */
  renderDrop (coordRunes) {
    let lastTween = {}
    for (let l = this.board.length - 1; l >= 0; l--) {
      for (let i = 0; i < coordRunes.length; i++) {
        if (l === coordRunes[i][0].i) {
          lastTween = this.renderSwap(coordRunes[i][0], coordRunes[i][1], 120)
        }
      }
    }
    return lastTween
  }

  /**
   * Отрисовывает пополнение поля
   * @param  {Array.<coordRune>} coordRunes Координаты рун
   * @return {Phaser.Tween} Анимация пополнения
   */
  renderRefull (coordRunes) {
    this.cleanRunes(coordRunes)
    let tween = this.renderRunes(coordRunes, 120, 50)
    tween.onComplete.add(() => {
      this.groupBoard.setAll('inputEnabled', true)
    })
    return tween
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
  renderRunes (runes, speedAnimation = 500, delayAnimation = 0, autoStart = true) {
    let tween = {}
    for (let l = runes.length - 1; l >= 0; l--) {
      let rune = this.initRune(runes[l].i, runes[l].j, runes[l].type)

      for (let eventName in this.configSpriteRune.events) {
        rune.events[eventName].add(this.linkGame[ this.configSpriteRune.events[eventName] ], this.linkGame, 0, {i: runes[l].i, j: runes[l].j})
      }

      this.board[runes[l].i][runes[l].j] = rune
      this.groupBoard.add(rune)

      tween = this.linkGame.add
        .tween(rune)
        .to({
          y: this.posYRune(runes[l].i)
        },
        this.multiplierSpeedAnimation * speedAnimation,
        Phaser.Easing.Sinusoidal.Out,
        autoStart,
        delayAnimation
      )
    }
    return tween
  }

  /**
   * Отрисовывет с задержкой подсказду для возможного хода, анимация состоит из 2 частей
   * **! ВАЖНО** предварительно в разделе `create` надо загрузить (`this.game.load`) изображение
   * @param    {coordRune}     coordRuneOne                              Координата первой руны
   * @param    {coordRune}     coordRuneTwo                              Координата второй руны
   * @param    {Config.Sprite} configSuggestionSprite                    Конфигурация спрайта
   * @param    {Number=}       delayShow                                 Задержка показа подсказки
   * @property {Number}        x=posXRune(coordRuneOne.j)                Координата по Х
   * @property {Number}        y=posYRune(coordRuneOne.i)                Координата по Y
   * @property {Number}        width=configSuggestionSprite.size.width   Ширина
   * @property {Number}        height=configSuggestionSprite.size.height Высота
   * @property {Number}        alpha=0                                   Прозрачность
   * @property {Phaser.Point}  anchor=0.1                                Точка вращения
   * @return {Phaser.Tween} Анимация передвежения подсказки
   */
  renderSuggestion (coordRuneOne, coordRuneTwo, configSuggestionSprite, delayShow = 3500) {
    let suggestion = this.linkGame.add.image(0, 0, configSuggestionSprite.fileName)
    suggestion.anchor.set(0.1)
    suggestion.width = configSuggestionSprite.size.width
    suggestion.height = configSuggestionSprite.size.height
    suggestion.alpha = 0
    suggestion.x = this.posXRune(coordRuneOne.j)
    suggestion.y = this.posYRune(coordRuneOne.i)

    this.groupSuggestion.add(suggestion)

    let tweenShow = this.linkGame.add
      .tween(suggestion)
      .to({
        alpha: 0.7
      },
      this.multiplierSpeedAnimation * 300,
      Phaser.Easing.Linear.None,
      true,
      delayShow
    )
    let tween = this.linkGame.add
      .tween(suggestion)
      .to({
        x: this.posXRune(coordRuneTwo.j),
        y: this.posYRune(coordRuneTwo.i)
      },
      this.multiplierSpeedAnimation * 1000,
      Phaser.Easing.Linear.None,
      true,
      500,
      -1,
      true
    )
    tweenShow.chain(tween)
    this.tweensSuggestion.push(tween)
    return tween
  }

  /**
   * Отрисовывет обмен рун
   * @param  {coordRune} coordRuneOne   Координата первой руны
   * @param  {coordRune} coordRuneTwo   Координата второй руны
   * @param  {Number=}   speedAnimation Скорость анимации
   * @param  {Number=}   delayAnimation Задержка анимации
   * @return {Phaser.Tween} Анимация обмена рун
   */
  renderSwap (coordRuneOne, coordRuneTwo, speedAnimation = 500, delayAnimation = 0) {
    this.linkGame.add
      .tween(this.board[coordRuneOne.i][coordRuneOne.j])
      .to({
        x: this.posXRune(coordRuneTwo.j),
        y: this.posYRune(coordRuneTwo.i)
      },
      this.multiplierSpeedAnimation * speedAnimation,
      Phaser.Easing.Linear.None,
      true,
      delayAnimation
    )
    let lastTween = this.linkGame.add
      .tween(this.board[coordRuneTwo.i][coordRuneTwo.j])
      .to({
        x: this.posXRune(coordRuneOne.j),
        y: this.posYRune(coordRuneOne.i)
      },
      this.multiplierSpeedAnimation * speedAnimation,
      Phaser.Easing.Linear.None,
      true,
      delayAnimation
    )
    this.swap(coordRuneOne, coordRuneTwo)
    return lastTween
  }

  /**
   * Ообмен спрайт-рун
   * **! ВАЖНО** Используется только в пределах класса
   * @protected
   * @param  {coordRune} coordRuneOne Координата первой руны
   * @param  {coordRune} coordRuneTwo Координата второй руны
   */
  swap (coordRuneOne, coordRuneTwo) {
    this.board[coordRuneOne.i][coordRuneOne.j].events.onInputDown['_bindings'][0]['_args'][0] = {i: coordRuneTwo.i, j: coordRuneTwo.j}
    this.board[coordRuneTwo.i][coordRuneTwo.j].events.onInputDown['_bindings'][0]['_args'][0] = {i: coordRuneOne.i, j: coordRuneOne.j}
    let tmp = this.board[coordRuneOne.i][coordRuneOne.j]
    this.board[coordRuneOne.i][coordRuneOne.j] = this.board[coordRuneTwo.i][coordRuneTwo.j]
    this.board[coordRuneTwo.i][coordRuneTwo.j] = tmp
  }

  /**
   * Рaзблокирует взаимодействие с рунами (`groupBoard`)
   */
  unBlockRunes () {
    this.groupBoard.setAll('inputEnabled', true)
  }
}
