/* TODO LIST
 * оптимизировать - поиск цепей и их комбинаций
 * оптимизировать - поиск возможных ходов
 * метод для свапнутых рун - поиск изменений
 * рассмотреть возможность не хранить значения линий внутри класса
 * при пополнении поля - проверка на возможные ходы
 * проверка на вхождение в поле не нужна если проверять паттерны в поиске ходов
 */

const Signal = require('events')
const SeedRandom = require('seedrandom')

/**
 * @typedef  {Object} coord Координата
 * @property {Number} i     Строка
 * @property {Number} j     Колонка
 * @example
 * Object = {i: 0, j: 3}
 */

/**
 * @typedef  {Object} region Регион
 * @property {coord}  start  Верхняя левая точка региона
 * @property {coord}  end    Нижняя правая точка региона
 * @example
 * Object = {
     start: {i: 0, j: 0},
     end:   {i: 100, j: 100}
   }
 */

/**
 * @typedef  {Object} rune   Конфигурация руны
 * @property {Number} limit Максимальный процент количества рун на поле от общего числа
 * @property {region} region Допустимые границы генерации руны
 * @example
 * Object = {
     limit: 15,
     region: {
       start: {i: 0, j: 0},
       end:   {i: 100, j: 100}
     }
   }
*/

/**
 * @typedef  {Array.coord} cluster Линия
 * @property {coord}       coord   Координаты руны
 * @example
 * // cluster
 * Array = [
 *  {i:0, j:3},
 *  {i:0, j:4},
 *  ...
 * ]
 *
 * // clusters
 * Array = [
 *  [{i:0, j:3}, {i:0, j:4}],
 *  [{i:3, j:2}, {i:4, j:2}, {i:5, j:2}, ... ],
 *  ...
 * ]
 */

/**
 * Логическое представление игрового поля (основная механика игры)
 * @class
 */
class Board {
  /**
   * Конструктор объекта поля
   * @constructor
   * @param {Array.<rune>} runes         Список генерируемых рун
   * @param {String}       generationKey Ключ для генерации поля
   * @param {Number=}      rows          Количество строк поля
   * @param {Number=}      columns       Количество колонок поля
   */
  constructor (runes, generationKey, rows = 6, columns = 6) {
    /**
     * Список генерируемых рун
     * @type {Array.<runes>}
     */
    this.runes = runes
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
     * Поле
     * @type {Array.Number}
     */
    this.board = []
    for (let i = 0; i < this.rows; i++) {
      this.board[i] = []
      for (let j = 0; j < this.columns; j++) {
        this.board[i][j] = -1
      }
    }
    // /**
    //  * Координаты выбранной руны
    //  * @type {coord}
    //  * @protected
    //  */
    // this._activeRune = null
    /**
     * Массив линий
     * @type {Array.<cluster>}
     * @protected
     */
    this._clusters = []
    /**
     * Функция для генерации псевдослучайных чисел
     * @type {Function}
     */
    this.seedRandom = SeedRandom(generationKey)
    /**
     * Класс событий поля
     * @type {Event}
     */
    this.signal = new Signal()
  }

  /**
   * Загружает сохраненное поле
   * @param  {Array.Number} savedBoard сохраненное поле
   * @return {Array.Number} Возвращает, игровое поле `this.board`
   */
  loadBoard (savedBoard) {
    this.board = []
    this.rows = savedBoard.length
    this.columns = savedBoard[0].length
    this.board = Object.assign([], savedBoard)
    this.signal.emit('onloadBoard', Object.assign([], savedBoard))
    return this.board
  }

  /**
   * Выполняет сравнение между двумя координатами рун, чтобы определить, эквивалентны ли они.
   * @param  {coord} coordOne Координата первой руны
   * @param  {coord} coordTwo Координата второй руны
   * @return {Boolean} Возвращает, true если координаты эквивалентны, иначе false.
   */
  isEqualCoords (coordOne, coordTwo) {
    return (coordOne.i === coordTwo.i && coordOne.j === coordTwo.j)
  }

  // /**
  //  * Возвращает координаты активной руны
  //  * @return {coord} Возвращает коорлинаты активной руны
  //  */
  // get activeRune () {
  //   return this._activeRune
  // }
  //
  // /**
  //  * Делает руну активной.
  //  * @param  {coord} coord Координата выбранной руны
  //  * @return {coord} Возвращает, координаты активной руны
  //  */
  // set activeRune (coord) {
  //   this._activeRune = coord
  //   this.signal.emit('onActiveRune', coord)
  //   return this._activeRune
  // }
  //
  // /**
  //  * Проверяет есть ли активная руна
  //  * @return {Boolean} Возвращает, true если есть активная руна, иначе false.
  //  */
  // isActiveRune () {
  //   return this._activeRune !== null
  // }
  //
  // /**
  //  * Деактивирует руну.
  //  * @return {coord} Возвращает, координаты деактивированой руны
  //  */
  // deactiveRune () {
  //   let deactiveRune = this._activeRune
  //   this._activeRune = null
  //   this.signal.emit('onDeactiveRune', deactiveRune)
  //   return deactiveRune
  // }

  /**
   * Проверяет являются ли руны соседними по горизонтали или вертикали
   * Патерн:
   * ```
   *     x
   *   x 0 x
   *     x
   * ```
   * @param  {coord} coordOne Координата первой руны
   * @param  {coord} coordTwo Координата второй руны
   * @return {Boolean}  Возвращает, true если руны соседние по горизонтали или вертикали, иначе false.
   */
  isAdjacent (coordOne, coordTwo) {
    return (Math.abs(coordTwo.i - coordOne.i) === 1 && Math.abs(coordTwo.j - coordOne.j) === 0) ||
           (Math.abs(coordTwo.i - coordOne.i) === 0 && Math.abs(coordTwo.j - coordOne.j) === 1)
  }

  /**
   * Меняет местами руны
   * @param  {coord} coordOne Координата первой руны
   * @param  {coord} coordTwo Координата второй руны
   * @return {Array.<coord>}      Координаты обмененых рун
   */
  _swap (coordOne, coordTwo) {
    let tmp = this.board[coordOne.i][coordOne.j]
    this.board[coordOne.i][coordOne.j] = this.board[coordTwo.i][coordTwo.j]
    this.board[coordTwo.i][coordTwo.j] = tmp
    return [ coordOne, coordTwo ]
  }

  swap (coordOne, coordTwo) {
    let coords = this._swap(coordOne, coordTwo)
    this.signal.emit('onSwap', coords)
    return coords
  }

  /**
   * Проверяет входят ли координата руны в границы поля
   * @param  {Array} coordRunes Координаты рун
   * @return {Boolean} Возвращает true, если координата руны входит в границы поля, иначе false.
   */
  isInBoard (coords) {
    if (coords.i < 0 ||
        coords.j < 0 ||
        coords.i >= this.rows ||
        coords.j >= this.columns) {
      return false
    }
    return true
  }

  /**
   * Выполняет сравнение между типом основной руны и типом каждой руны в массиве, чтобы определить, эквивалентны ли они.
   * @param  {coord}    coord  Координата основной руны
   * @param  {...coord} coords Координаты проверямых рун
   * @return {Boolean} Возвращает, true если тип каждой руны в массиве эквивалентен типу основной руны, иначе false.
   */
  isEqualType (coord, ...coords) {
    if (!this.isInBoard(coord)) return false
    for (let l = 0; l < coords.length; l++) {
      if (!this.isInBoard(coords[l])) return false
      if (this.board[coord.i][coord.j] !== this.board[coords[l].i][coords[l].j]) {
        return false
      }
    }
    return true
  }

  /**
   * Проверяет по координате руны на наличие горизонтальных линий
   * @param  {Number} i Номер строки
   * @param  {Number} j Номер столбца
   * @return {Array.<claster>} Возвращает, массив координат рун, иначе пустой массив.
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
   * Проверяет по координате руны на наличие вертикальных линий
   * @param  {Number} i Номер строки
   * @param  {Number} j Номер столбца
   * @return {Array.<claster>} Возвращает, массив координат рун, иначе пустой массив.
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
   * Проверяет по координате руны на наличие вертикальных и горизонтальных линий
   * @param  {coord} coord Координаты руны
   * @return {Array.<claster>} Возвращает, массив координат рун (`this.clusters`).
   */
  findClusters (coord) {
    // по горизонтали
    for (let l = 0; l < this.columns - 2; l++) {
      let cluster = this.findHorizontalClusters(coord.i, l)
      if (cluster.length > 2) {
        this.clusters = cluster
        l += cluster.length - 1
      }
    }
    // по вертикали
    for (let l = 0; l < this.rows - 2; l++) {
      let cluster = this.findVerticalClusters(l, coord.j)
      if (cluster.length > 2) {
        this.clusters = cluster
        l += cluster.length - 1
      }
    }
    return this.clusters
  }

  /**
   * Разрушает руны (задает руне новый тип = -1) входящие в линию, количество разрушенных рун по типам добавляет в объект `destroyedRunes`,
   * очищает массив `clusters`
   * @return {Array.<coord>} Возвращает, массив координат разрушенных рун
   */
  deleteClusters () {
    let coordDestroyedRunes = []
    for (let l = 0; l < this.clusters.length; l++) {
      for (let t = 0; t < this.clusters[l].length; t++) {
        if (this.board[this.clusters[l][t].i][this.clusters[l][t].j] > -1) {
          coordDestroyedRunes.push({i: this.clusters[l][t].i, j: this.clusters[l][t].j})
          this.board[this.clusters[l][t].i][this.clusters[l][t].j] = -1
        }
      }
    }
    this.cleanClusters()

    this.signal.emit('onDeleteCluster', coordDestroyedRunes)
    return coordDestroyedRunes
  }

  /**
   * Опускает руны на места разрушенных рун (все разрушенные руны поднимает наверх)
   * **! ВАЖНО** второй элемент (`coordDropedRunes[1]`) в паре всегда разрушенная руна
   * @return {Array.Array.<coord>} Возвращает, массив пар координат обмененых рун
   * @example
   * Array = [
   *   [{i: 1, j: 3}, {i: 2, j: 3}],
   *   [{i: 5, j: 2}, {i: 5, j: 3}]
   * ]
   */
  drop () {
    let coordDropedRunes = []
    for (let j = 0; j < this.columns; j++) {
      let firstEmpty = null
      for (let i = this.rows - 1; i >= 0; i--) {
        if (firstEmpty === null) {
          if (this.board[i][j] === -1) {
            firstEmpty = i
          }
        } else {
          if (this.board[i][j] > -1) {
            this._swap({i, j}, {i: firstEmpty, j: j})
            coordDropedRunes.push([{i, j}, {i: firstEmpty, j: j}])
            firstEmpty--
          }
        }
      }
    }
    this.signal.emit('onDrop', coordDropedRunes)
    return coordDropedRunes
  }

  /**
   * TODO
   * @return {TODO} TODO
   */
  get clusters () {
    return this._clusters
  }

  /**
   * TODO
   * @param  {TODO} TODO
   * @return {TODO} TODO
   */
  set clusters (cluster) {
    this._clusters.push(cluster)
    return this._clusters
  }

  /**
   * Проверяет есть ли линии
   * @return {Boolean} Возвращает, true если есть линии, иначе false.
   */
  isClusters () {
    return this.clusters.length > 0
  }

  cleanClusters () {
    this._clusters = []
  }

  /**
   * Проверяет поле на наличие вертикальных и горизонтальных линий
   * @return {Array.<claster>} Возвращает, массив координат рун `this.clusters`, иначе пустой массив.
   */
  findAllClusters () {
    for (let l = 0; l < this.rows; l++) {
      this.findClusters({i: l, j: l})
    }
    return this.clusters
  }

  /**
   * Проверяет имеет ли возможность руна данного типа входить в данный регион
   * @param  {Number} i Номер строки
   * @param  {Number} j Номер столбца
   * @param  {Number} type Тип руны
   * @return {Boolean} Возвращает, true если руне можно входить в регион, иначе false.
   */
  isInRegion (i, j, type) {
    return (i >= Math.round(this.rows / 100 * this.runes[type].region.start.i) &&
            j >= Math.round(this.columns / 100 * this.runes[type].region.start.j) &&
            i <= Math.round(this.rows / 100 * this.runes[type].region.end.i) &&
            j <= Math.round(this.columns / 100 * this.runes[type].region.end.j))
  }

  /**
   * Проверяет не привышает ли руна данного типа лимиты (% от общего числа рун)
   * @param  {Number} Тип руны
   * @return {Boolean} Возвращает, true если руна не привышает лимит, иначе false.
   */
  isInLimit (type) {
    let countType = []
    for (let i = 0; i < this.runes.length; i++) countType[i] = 0

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        if (this.board[i][j] > -1) {
          countType[this.board[i][j]]++
        }
      }
    }
    let limit = Math.round((this.columns * this.rows) / 100 * this.runes[type].limit)
    return (countType[type] + 1 <= limit)
  }

  /**
   * Проверяет создает ли руна линию (проверяет по 2 руны сверху и слева)
   * Патерн:
   * ```
   *      x
   *      x
   *  x x 0
   *  ```
   * @param  {Number} i Номер строки
   * @param  {Number} j Номер столбца
   * @param  {Number} type Тип руны
   * @return {Boolean} Возвращает true, если руна создает линию, иначе false.
   */
  isInNewCluster (i, j, type) {
    if (i > 1) {
      if (type === this.board[i - 1][j] &&
          type === this.board[i - 2][j]) {
        return true
      }
    }
    if (j > 1) {
      if (type === this.board[i][j - 1] &&
          type === this.board[i][j - 2]) {
        return true
      }
    }
    return false
  }

  /**
   * Генерирует случайное целое число в диапозоне [0, `this.runes.length`]
   * @return {Number} Возвращает случайное целое число
   */
  generationRune () {
    return Math.floor(this.seedRandom() * (this.runes.length))
  }

  /**
   * Генерирует случайное игровое поле
   * @return {Array} Возвращает, массив `this.board`
   */
  generationBoard (minMoveCount = 3) {
    do {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          let randomType = -1
          do {
            randomType = this.generationRune()
          } while (!this.isInLimit(randomType) ||
                   !this.isInRegion(i, j, randomType) ||
                   this.isInNewCluster(i, j, randomType))
          this.board[i][j] = randomType
        }
      }
    } while (this.findMoves().length < minMoveCount)

    let newBoard = Object.assign([], this.board)
    this.signal.emit('onLoad', newBoard)
    return newBoard
  }

  /**
   * TODO что если нет возможных ходов ?
   * Пополняет поле, заменет пустые руны случайными рунами с учетом их шанса и региона
   * @return {Array.<Number>} Возвращает, массив тип новых рун
   */
  generationSegment (minMoveCount = 1) {
    let newRunes = []
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        if (this.board[i][j] === -1) {
          let randomType = -1
          do {
            randomType = this.generationRune()
          } while (!this.isInLimit(randomType))
          this.board[i][j] = randomType
          newRunes.push(randomType)
        }
      }
    }
    this.signal.emit('generationSegment', newRunes)
    return newRunes
  }

  // Возвращает, массив координаты и тип новых рун
  refill (runes) {
    let coordAndTypeRunes = []
    let next = 0
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        if (this.board[i][j] === -1) {
          this.board[i][j] = runes[next]
          coordAndTypeRunes.push({i, j, type: runes[next]})
          next++
        }
      }
    }
    this.signal.emit('onRefill', coordAndTypeRunes)
    return coordAndTypeRunes
  }

  /**
   * TODO **! ВАЖНО - ЭТО В РАЗРАБОТКЕ !, не оптимально !!!**
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
        let coordRuneO = {}
        let coordRuneX = {}
        let coordRune1 = {i, j}
        let coordRune2 = {i: i, j: j + 1}
        if (this.isEqualType(coordRune1, coordRune2)) {
          coordRuneO = {i: i, j: j + 2}
          coordRuneX = {i: i - 1, j: j + 2}
          if (this.isEqualType(coordRune1, coordRuneX)) moves.push({coordRuneO, coordRuneX})
          coordRuneX = {i: i, j: j + 3}
          if (this.isEqualType(coordRune1, coordRuneX)) moves.push({coordRuneO, coordRuneX})
          coordRuneX = {i: i + 1, j: j + 2}
          if (this.isEqualType(coordRune1, coordRuneX)) moves.push({coordRuneO, coordRuneX})

          coordRuneO = {i: i, j: j - 1}
          coordRuneX = {i: i - 1, j: j - 1}
          if (this.isEqualType(coordRune1, coordRuneX)) moves.push({coordRuneO, coordRuneX})
          coordRuneX = {i: i, j: j - 2}
          if (this.isEqualType(coordRune1, coordRuneX)) moves.push({coordRuneO, coordRuneX})
          coordRuneX = {i: i + 1, j: j - 1}
          if (this.isEqualType(coordRune1, coordRuneX)) moves.push({coordRuneO, coordRuneX})
        }

        coordRune2 = {i: i + 1, j: j}
        if (this.isEqualType(coordRune1, coordRune2)) {
          coordRuneO = {i: i + 2, j: j}
          coordRuneX = {i: i + 2, j: j - 1}
          if (this.isEqualType(coordRune1, coordRuneX)) moves.push({coordRuneO, coordRuneX})
          coordRuneX = {i: i + 3, j: j}
          if (this.isEqualType(coordRune1, coordRuneX)) moves.push({coordRuneO, coordRuneX})
          coordRuneX = {i: i + 2, j: j + 1}
          if (this.isEqualType(coordRune1, coordRuneX)) moves.push({coordRuneO, coordRuneX})

          coordRuneO = {i: i - 1, j: j}
          coordRuneX = {i: i - 1, j: j - 1}
          if (this.isEqualType(coordRune1, coordRuneX)) moves.push({coordRuneO, coordRuneX})
          coordRuneX = {i: i - 2, j: j}
          if (this.isEqualType(coordRune1, coordRuneX)) moves.push({coordRuneO, coordRuneX})
          coordRuneX = {i: i - 1, j: j + 1}
          if (this.isEqualType(coordRune1, coordRuneX)) moves.push({coordRuneO, coordRuneX})
        }

        coordRune2 = {i: i, j: j + 2}
        if (this.isEqualType(coordRune1, coordRune2)) {
          coordRuneO = {i: i, j: j + 1}
          coordRuneX = {i: i + 1, j: j + 1}
          if (this.isEqualType(coordRune1, coordRuneX)) moves.push({coordRuneO, coordRuneX})
          coordRuneX = {i: i - 1, j: j + 1}
          if (this.isEqualType(coordRune1, coordRuneX)) moves.push({coordRuneO, coordRuneX})
        }

        coordRune2 = {i: i + 2, j: j}
        if (this.isEqualType(coordRune1, coordRune2)) {
          coordRuneO = {i: i + 1, j: j}
          coordRuneX = {i: i + 1, j: j - 1}
          if (this.isEqualType(coordRune1, coordRuneX)) moves.push({coordRuneO, coordRuneX})
          coordRuneX = {i: i + 1, j: j + 1}
          if (this.isEqualType(coordRune1, coordRuneX)) moves.push({coordRuneO, coordRuneX})
        }
      }
    }
    return moves
  }
}

module.exports = Board
