const Rune = require('./rune')

/**
 * @typedef  {Object} countRunes
 * @property {Number} type  Тип руны
 * @property {Number} count Количество рун
 * @example
 * Object = {1: 15, 2: 3, 4:9, 5:9}
 */
/**
 * @typedef  {Object} coordRune
 * @property {Number} i Строка руны
 * @property {Number} j Колонка руны
 * @example
 * Object = {i:0, j:3}
 */
/**
 * @typedef  {Object} coordAndTypeRune
 * @property {Number} i    Строка руны
 * @property {Number} j    Колонка руны
 * @property {Number} type Тип руны
 * @example
 * Array = [{i:0, j:3, type:4}, {i:0, j:4, type:5}, {i:0, j:5, type:3}, ... ]
 */
/**
 * @typedef  {Array.coordRune} cluster
 * @property {coordRune} coordRune Координаты руны
 * @example
 * // cluster
 * Array = [{i:0, j:3}, {i:0, j:4}, ... ]
 * // clusters
 * Array = [[{i:0, j:3}, {i:0, j:4}], [{i:3, j:2}, {i:4, j:2}, {i:5, j:2}, ... ], ... ]
 */

/**
 * Логическое представление игрового поля (основная механика игры)
 * @class
 */
class Board {
  /**
   * Конструктор объекта поля
   * @constructor
   * @param {Number=} rows                 Количество строк поля
   * @param {Number=} columns              Количество колонок поля
   * @param {Number=} maxTypeGenerateRunes Количество типов генерируемых рун на поле (от 1 до maxTypeGenerateRunes)
   */
  constructor (rows = 6, columns = 6, maxTypeGenerateRunes = 5) {
    /**
     * Количество колонок поля
     * @type {Number}
     */
    this.rows = rows
    /**
     * Количество строк поля
     * @type {Number}
     */
    this.columns = columns
    /**
     * Количество типов генерируемых рун на поле
     * @type {Number}
     */
    this.maxTypeGenerateRunes = maxTypeGenerateRunes
    /**
     * Поле
     * @type {Array.<Rune>}
     */
    this.board = []
    /**
     * Массив линий
     * @type {Array.<cluster>}
     */
    this.clusters = []
    /**
     * Объект содержащий количество разрушенных рун сортировка по типам руны
     * @type {destroyedRunes}
     */
    this.destroyedRunes = {}
    /**
     * Координаты выбранной руны
     * @type {coordRune}
     */
    this.activeRune = {}
  }

  /*
  *
  * Блок сравненией
  *
   */
  /**
   * Выполняет сравнение между двумя координатами рун, чтобы определить, эквивалентны ли они.
   * @param  {coordRune} coordRuneOne Координата первой руны
   * @param  {coordRune} coordRuneTwo Координата второй руны
   * @return {Boolean} Возвращает, true если координаты эквивалентны, иначе false.
   */
  isEqualCoords (coordRuneOne, coordRuneTwo) {
    return (coordRuneOne.i === coordRuneTwo.i &&
            coordRuneOne.j === coordRuneTwo.j)
  }

  /**
  * Выполняет сравнение между двумя типами рун, чтобы определить, эквивалентны ли они.
   * @param  {coordRune} coordRuneOne Координата первой руны
   * @param  {coordRune} coordRuneTwo Координата второй руны
   * @return {Boolean} Возвращает, true если типы эквивалентны, иначе false.
   */
  isEqualType (coordRuneOne, coordRuneTwo) {
    if (this.isInRange(coordRuneOne, coordRuneTwo)) {
      return (this.board[coordRuneOne.i][coordRuneOne.j].type === this.board[coordRuneTwo.i][coordRuneTwo.j].type)
    }
    return false
  }

  /**
   * TODO грамотное описание ↓
   * Добавляет в объект `countRunes` количество разрушенных рун
   * @param  {Number} type Тип руны
   * @return {countRunes} Возвращает, jбъект содержащий количество разрушенных рун сортировка по типам руны
   * @example
   * Object = {
   *   1: 15, // 1 типа = 15 рун
   *   3: 3   // 3 типа = 3 руны
   *  }
   */
  addCountTypesDestroyedRunes (type) {
    if (this.destroyedRunes[type] === undefined) {
      this.destroyedRunes[type] = 1
    } else {
      this.destroyedRunes[type]++
    }
    return this.destroyedRunes
  }

  /*
  *
  * Блок очистки
  *
  */
  /**
   * Очищает массив `clusters`
   */
  cleanClusters () {
    this.clusters = []
  }

  /**
   * Очищает объект `countRunes`
   */
  cleanCountRunes () {
    this.destroyedRunes = {}
  }

  /**
   * Очищает поле `board` и массив линий `clusters`
   * **! ВАЖНО** не очищает количество удалленых рун `countRunes`
   */
  deleteBoard () {
    this.cleanClusters()
    this.board = []
  }

  /**
   * Удаляет руны входящие в линию, после чего очищает массив  `clusters`
   * @return {Array.<coordRune>} Координаты удаленных рун
   */
  deleteClusters () {
    let coordRunes = []
    for (let l = 0; l < this.clusters.length; l++) {
      for (let t = 0; t < this.clusters[l].length; t++) {
        if (this.board[this.clusters[l][t].i][this.clusters[l][t].j].type > 0) {
          this.addCountTypesDestroyedRunes(this.board[this.clusters[l][t].i][this.clusters[l][t].j].type)
          coordRunes.push({i: this.clusters[l][t].i, j: this.clusters[l][t].j})
          this.board[this.clusters[l][t].i][this.clusters[l][t].j].newType(0)
        }
      }
    }
    this.cleanClusters()
    return this.destroyedRunes
  }

  /**
   * Опускает руны на свободные места (все пустые руны поднимает наверх)
   * **! ВАЖНО** второй элемент в паре всегда пустая руна `coordRunes[1]`
   * @return {Array.Array.<coordRune>} Массив пар координат обмененых рун
   * @example
   * coordRunes = [
   *   [{i: 1, j: 3}, {i: 2, j: 3}],
   *   [{i: 5, j: 2}, {i: 5, j: 3}]
   * ]
   */
  drop () {
    let coordRunes = []
    for (let j = 0; j < this.columns; j++) {
      let firstEmpty = null
      for (let i = this.rows - 1; i >= 0; i--) {
        if (firstEmpty === null) {
          if (this.board[i][j].type === 0) {
            firstEmpty = i
          }
        } else {
          if (this.board[i][j].type > 0) {
            this.swap({i, j}, {i: firstEmpty, j: j})
            coordRunes.push([{i, j}, {i: firstEmpty, j: j}])
            firstEmpty--
          }
        }
      }
    }
    return coordRunes
  }

  /**
   * Возвращает TRUE, если тип каждой руны в массиве совпадает с типом основной руны
   * @param  {coordRune}    coordRune  Координата основной руны
   * @param  {...coordRune} coordRunes Координата проверямой руны
   * @return {Boolean}
   */
  everyisEqualType (coordRune, ...coordRunes) {
    if (!this.isInRange(coordRunes)) return false
    for (let l = 0; l < coordRunes.length; l++) {
      if (this.isEqualType(coordRune, coordRunes[l])) {
        return false
      }
    }
    return true
  }

  /**
   * TODO filterisEqualType
   * **! ВАЖНО - ЭТО В РАЗРАБОТКЕ !**
   * Возвращает массив пар координат рун совпадающие/не совпадающих с типом основной руны
   * @param  {Boolean}      isFlag     TRUE - вернет координаты рун совпадающие с типом основной руны
   *                                   FALSE - вернет координаты рун НЕ совпадающие с типом основной руны
   * @param  {coordRune}    coordRune  Координата основной руны
   * @param  {...coordRune} coordRunes Координата проверямой руны
   * @return {Array.<coordRune>}       Массив пар координат совпадающих/не совпадающих рун
   */
  filterisEqualType (isFlag, coordRune, ...coordRunes) {
    function filterByType (coordRuneX) {
      if (!this.isInRange(coordRune, coordRuneX)) return false
      return (isFlag ^ this.isEqualType(coordRune, coordRuneX))
    }
    return coordRunes.filter(filterByType(), coordRune, isFlag)
  }

  /**
   * Возвращает все вертикальные и горизонтальные линии поля
   * @return {Array.<claster>} Массив линий (координаты рун)
   */
  findAllClusters () {
    for (let l = 0; l < this.rows; l++) {
      this.findClusters({i: l, j: l})
    }
    return this.clusters
  }

  /**
   * TODO доделать если нет передаваемого параметра
   * Возвращает вертикальные и горизонтальные линии по координате руны
   * @param  {coordRune} coordRune Координаты руны
   * @return {Array.<claster>} Массив линий (координаты рун)
   */
  findClusters (coordRune) {
    // по горизонтали
    for (let l = 0; l < this.columns - 2; l++) {
      let cluster = this.findHorizontalClusters(coordRune.i, l)
      if (cluster.length > 2) {
        this.clusters.push(cluster)
        l += cluster.length - 1
      }
    }
    // по вертикали
    for (let l = 0; l < this.rows - 2; l++) {
      let cluster = this.findVerticalClusters(l, coordRune.j)
      if (cluster.length > 2) {
        this.clusters.push(cluster)
        l += cluster.length - 1
      }
    }
    return this.clusters
  }

  /**
   * TODO доделать если нет передаваемого параметра
   * Возвращает горизонтальные линии
   * @param  {Number} i Номер строки
   * @param  {Number} j Номер столбца
   * @return {Array.<claster>} Массив линий (координаты рун)
   */
  findHorizontalClusters (i, j) {
    let cluster = []
    cluster.push({i: i, j: j})
    for (let l = 1; j + l < this.columns; l++) {
      if (this.isEqualType(cluster[0], {i: i, j: j + l})) {
        cluster.push({i: i, j: j + l})
      } else {
        return cluster
      }
    }
    return cluster
  }

  /**
   * TODO доделать если нет передаваемого параметра
   * Возвращает вертикальные линии
   * @param  {Number} i Номер строки
   * @param  {Number} j Номер столбца
   * @return {Array.<claster>} Массив линий (координаты рун)
   */
  findVerticalClusters (i, j) {
    let cluster = []
    cluster.push({i: i, j: j})
    for (let l = 1; i + l < this.rows; l++) {
      if (this.isEqualType(cluster[0], {i: i + l, j: j})) {
        cluster.push({i: i + l, j: j})
      } else {
        return cluster
      }
    }
    return cluster
  }

  /**
   * TODO findMoves
   * **! ВАЖНО - ЭТО В РАЗРАБОТКЕ !**
   * Возвращает массив возможных ходов
   * 1 - Первая руна
   * 2 - Вторая руна
   * x - Третяя руна
   * o - координата смещения третей руны
   * Патерны:
   * ```
   *   x     x
   * x o 1 2 o x
   *   x     x
   * ```
   * ```
   *   x
   * x o x
   *   1
   *   2
   * x o x
   *   x
   * ```
   * ```
   *   x
   * 1 o 2
   *   x
   * ```
   * ```
   *   1
   * x o x
   *   2
   * ```
   * @return {Array.Array.<coordRune>} Массив пар координат рун для обмена
   */
  findMoves () {
    let moves = []
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        let coordRuneStart = {i, j}
        let coordRuneOne = {}

        let coordRuneTwo = {i: i, j: j + 1}
        if (this.isEqualType(coordRuneStart, coordRuneTwo)) {
          coordRuneOne = {i: i, j: j + 2}
          coordRuneTwo = {i: i - 1, j: j + 2}
          if (this.isEqualType(coordRuneStart, coordRuneTwo)) moves.push({coordRuneOne, coordRuneTwo})
          coordRuneTwo = {i: i, j: j + 3}
          if (this.isEqualType(coordRuneStart, coordRuneTwo)) moves.push({coordRuneOne, coordRuneTwo})
          coordRuneTwo = {i: i + 1, j: j + 2}
          if (this.isEqualType(coordRuneStart, coordRuneTwo)) moves.push({coordRuneOne, coordRuneTwo})

          coordRuneOne = {i: i, j: j - 1}
          coordRuneTwo = {i: i - 1, j: j - 1}
          if (this.isEqualType(coordRuneStart, coordRuneTwo)) moves.push({coordRuneOne, coordRuneTwo})
          coordRuneTwo = {i: i, j: j - 2}
          if (this.isEqualType(coordRuneStart, coordRuneTwo)) moves.push({coordRuneOne, coordRuneTwo})
          coordRuneTwo = {i: i + 1, j: j - 1}
          if (this.isEqualType(coordRuneStart, coordRuneTwo)) moves.push({coordRuneOne, coordRuneTwo})
        }

        coordRuneTwo = {i: i + 1, j: j}
        if (this.isEqualType(coordRuneStart, coordRuneTwo)) {
          coordRuneOne = {i: i + 2, j: j}
          coordRuneTwo = {i: i + 2, j: j - 1}
          if (this.isEqualType(coordRuneStart, coordRuneTwo)) moves.push({coordRuneOne, coordRuneTwo})
          coordRuneTwo = {i: i + 3, j: j}
          if (this.isEqualType(coordRuneStart, coordRuneTwo)) moves.push({coordRuneOne, coordRuneTwo})
          coordRuneTwo = {i: i + 2, j: j + 1}
          if (this.isEqualType(coordRuneStart, coordRuneTwo)) moves.push({coordRuneOne, coordRuneTwo})

          coordRuneOne = {i: i - 1, j: j}
          coordRuneTwo = {i: i - 1, j: j - 1}
          if (this.isEqualType(coordRuneStart, coordRuneTwo)) moves.push({coordRuneOne, coordRuneTwo})
          coordRuneTwo = {i: i - 2, j: j}
          if (this.isEqualType(coordRuneStart, coordRuneTwo)) moves.push({coordRuneOne, coordRuneTwo})
          coordRuneTwo = {i: i - 1, j: j + 1}
          if (this.isEqualType(coordRuneStart, coordRuneTwo)) moves.push({coordRuneOne, coordRuneTwo})
        }

        coordRuneTwo = {i: i, j: j + 2}
        if (this.isEqualType(coordRuneStart, coordRuneTwo)) {
          coordRuneOne = {i: i, j: j + 1}
          coordRuneTwo = {i: i + 1, j: j + 1}
          if (this.isEqualType(coordRuneStart, coordRuneTwo)) moves.push({coordRuneOne, coordRuneTwo})
          coordRuneTwo = {i: i - 1, j: j + 1}
          if (this.isEqualType(coordRuneStart, coordRuneTwo)) moves.push({coordRuneOne, coordRuneTwo})
        }

        coordRuneTwo = {i: i + 2, j: j}
        if (this.isEqualType(coordRuneStart, coordRuneTwo)) {
          coordRuneOne = {i: i + 1, j: j}
          coordRuneTwo = {i: i + 1, j: j - 1}
          if (this.isEqualType(coordRuneStart, coordRuneTwo)) moves.push({coordRuneOne, coordRuneTwo})
          coordRuneTwo = {i: i + 1, j: j + 1}
          if (this.isEqualType(coordRuneStart, coordRuneTwo)) moves.push({coordRuneOne, coordRuneTwo})
        }
      }
    }
    return moves
  }

  /**
   * TODO создать безопастный способ генерации
   * TODO добавить многоуровневую генерацию
   * Генерирует случайное поле
   * @param  {Boolean=} isClusters   Установите TRUE - что бы были допустимы линии при генерации
   * @param  {Number=}  minMoveCount Количество минимальныо возможных ходов (**при большом значении параметра возможен бесконечный цикл**)
   * @return {Array.<Rune>}          Копия игрового поля `board`
   */
  generation (isClusters = false, minMoveCount = 3) {
    do {
      for (let i = 0; i < this.rows; i++) {
        this.board[i] = []
        for (let j = 0; j < this.columns; j++) {
          this.board[i][j] = new Rune(0)
          do {
            this.board[i][j].newRandomType(this.maxTypeGenerateRunes)
          }
          while (this.isRuneInCluster(i, j) && !isClusters)
        }
      }
    }
    while (this.findMoves() < minMoveCount)
    let newBoard = Object.assign([], this.board)
    return newBoard
  }

  /**
   * TODO доделать если нет передаваемого параметра
   * Возвращает колонку поля
   * @param  {Number} index Номер колонки
   * @return {Array}
   */
  getColumn (index) {
    let column = []
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        if (j === index) {
          column.push(this.board[i][j])
          break
        }
      }
    }
    return column
  }

  /**
   * TODO доделать если нет передаваемого параметра
   * Возвращает строку поля
   * @param  {Number} index Номер строки
   * @return {Array}
   */
  getRow (index) {
    return this.board[index]
  }

  /**
   * TODO доделать если нет передаваемого параметра
   * Проверяет являются ли руны соседними по горизонтали и вертикали
   * Патерн:
   * ```
   *     x
   *   x 0 x
   *     x
   * ```
   * @param  {coordRune} coordRuneOne Координата первой руны
   * @param  {coordRune} coordRuneTwo Координата второй руны
   * @return {Boolean}
   */
  isAdjacentRune (coordRuneOne, coordRuneTwo) {
    return (Math.abs(coordRuneTwo.i - coordRuneOne.i) === 1 && Math.abs(coordRuneTwo.j - coordRuneOne.j) === 0) ||
           (Math.abs(coordRuneTwo.i - coordRuneOne.i) === 0 && Math.abs(coordRuneTwo.j - coordRuneOne.j) === 1)
  }

  /**
   * TODO доделать если нет передаваемого параметра
   * Проверяет входят ли координаты в границы поля
   * @param  {...coordRune} coordRunes Координата руны
   * @return {Boolean} TRUE  - в поле
   *                   FALSE - за полем
   */
  isInRange (...coordRunes) {
    for (let l = 0; l < coordRunes.length; l++) {
      if (coordRunes[l].i < 0 || coordRunes[l].i >= this.rows || coordRunes[l].j < 0 || coordRunes[l].j >= this.columns) return false
    }
    return true
  }

  /**
   * TODO доделать если нет передаваемого параметра
   * Проверяет создает ли руна линию (проверяет по 2 руны сверху и слева)
   * Патерн:
   * ```
   *      x
   *      x
   *  x x 0
   *  ```
   * @param  {Number} i Номер строки
   * @param  {Number} j Номер столбца
   * @return {Boolean}
   */
  isRuneInCluster (i, j) {
    if (i > 1) {
      if (!this.everyisEqualType({i, j}, {i: i - 1, j: j}, {i: i - 2, j: j})) {
        return true
      }
    }
    if (j > 1) {
      if (!this.everyisEqualType({i, j}, {i: i, j: j - 1}, {i: i, j: j - 2})) {
        return true
      }
    }
    return false
  }

  /**
   * Загружает сохраненное поле
   * @param  {Array.Number} savedBoard сохраненное поле
   * @return {Array.<Rune>} Копия игрового поля `board`
   */
  loadBoard (savedBoard) {
    if (this.validatorSavedBoard(savedBoard)) {
      this.board = []
      this.rows = savedBoard.length
      this.columns = savedBoard[0].length
      for (let i = 0; i < this.rows; i++) {
        this.board[i] = []
        for (let j = 0; j < this.columns; j++) {
          this.board[i][j] = new Rune(savedBoard[i][j])
        }
      }
      let newBoard = Object.assign([], this.board)
      return newBoard
    }
    return []
  }

  /**
   * Пополняет поле, заменет пустые руны случайными рунами в пределах от 1 до `maxTypeGenerateRunes`
   * @return {Array.<coordAndTypeRune>} Координаты и тип новых рун
   */
  refill () {
    let newRunes = []
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        if (this.board[i][j].type === 0) {
          let newRune = this.board[i][j].newRandomType(this.maxTypeGenerateRunes)
          newRunes.push({i, j, type: newRune})
        }
      }
    }
    return newRunes
  }

  /**
   * TODO доделать если нет передаваемого параметра
   * TODO распологать похожие методы рядом
   * TODO rename
   * Возвращает TRUE, если хотя бы один тип руны в массиве совпадает с типом основной руны
   * @param  {coordRune}    coordRune  Координата основной руны
   * @param  {...coordRune} coordRunes Координата проверямой руны
   * @return {Boolean}
   */
  someisEqualType (coordRune, ...coordRunes) {
    if (!this.isInRange(coordRunes)) return false
    for (let l = 0; l < coordRunes.length; l++) {
      if (this.isEqualType(coordRune, coordRunes[l])) {
        return true
      }
    }
    return false
  }

  /**
   * TODO определить функционал методов swap и swapRune
   * Меняет местами руны
   * **! ВАЖНО** Используется только в пределах класса
   * @protected
   * @param  {coordRune} coordRuneOne Координата первой руны
   * @param  {coordRune} coordRuneTwo Координата второй руны
   * @return {Array.<coordRune>}      Координаты обмененых рун
   */
  swap (coordRuneOne, coordRuneTwo) {
    let tmp = this.board[coordRuneOne.i][coordRuneOne.j]
    this.board[coordRuneOne.i][coordRuneOne.j] = this.board[coordRuneTwo.i][coordRuneTwo.j]
    this.board[coordRuneTwo.i][coordRuneTwo.j] = tmp
    return [ coordRuneOne, coordRuneTwo ]
  }

  /**
   * TODO определить функционал методов swap и swapRune
   * Меняет местами объекты руны
   * **! ВАЖНО** Для использования в пределах класса есть метод `swap`
   * @param  {coordRune} coordRuneOne Координата первой руны
   * @param  {coordRune} coordRuneTwo Координата второй руны
   * @return {Array.<coordRune>}      Координаты обмененых рун
   */
  swapRune (coordRuneOne, coordRuneTwo) {
    this.swap(coordRuneOne, coordRuneTwo)
    return [coordRuneOne, coordRuneTwo]
  }

  /**
   * Проверяет сохраненное поле
   * @param  {Array.Number} savedBoard сохраненное поле
   * @return {Boolean}
   */
  validatorSavedBoard (savedBoard) {
    if (savedBoard.length > 3 && savedBoard[0].length > 3) {
      for (let i = 0; i < savedBoard.length; i++) {
        for (let j = 0; j < savedBoard[0].length; j++) {
          if (savedBoard[i][j] < 0 || savedBoard[i][j] > this.maxTypeGenerateRunes) {
            return false
          }
        }
      }
      return true
    }
    return false
  }
}

module.exports = Board
