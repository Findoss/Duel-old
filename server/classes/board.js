const seedRandom = require('seedrandom')

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
 * @property {Number} chance Максимальный процент количества рун на поле от общего числа
 * @property {region} region Допустимые границы генерации руны
 * @example
 * Object = {
     chance: 15,
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
    /**
     * Координаты выбранной руны
     * @type {coord}
     */
    this.activeRune = null
    /**
     * Массив линий
     * @type {Array.<cluster>}
     */
    this.clusters = []
    /**
     * TODO
     * @type {String}
     */
    this.generationKey = generationKey
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
    this.board = savedBoard
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

  /**
   * Делает руну активной.
   * @param  {coord} coord Координата выбранной руны
   * @return {coord} Возвращает, координаты активной руны
   */
  pickActiveRune (coord) {
    this.activeRune = coord
    return this.activeRune
  }

  /**
   * Удаляет активную руну.
   * @return {coord} Возвращает, координаты удаленной активной руны
   */
  deActiveRune () {
    let deActiveRune = this.activeRune
    this.activeRune = null
    return deActiveRune
  }

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
  swap (coordOne, coordTwo) {
    let tmp = this.board[coordOne.i][coordOne.j]
    this.board[coordOne.i][coordOne.j] = this.board[coordTwo.i][coordTwo.j]
    this.board[coordTwo.i][coordTwo.j] = tmp
    return [ coordOne, coordTwo ]
  }

  /**
   * Выполняет сравнение между типом основной руны и типом каждой руны в массиве, чтобы определить, эквивалентны ли они.
   * @param  {coord}    coord  Координата основной руны
   * @param  {...coord} coords Координаты проверямых рун
   * @return {Boolean} Возвращает, true если тип каждой руны в массиве эквивалентен типу основной руны, иначе false.
   */
  isEqualType (coord, ...coords) {
    for (let l = 0; l < coords.length; l++) {
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
   * @return {Array.<claster>} Возвращает, массив координат рун (линии), иначе пустой массив.
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
   * @return {Array.<claster>} Возвращает, массив координат рун (линии), иначе пустой массив.
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
        this.clusters.push(cluster)
        l += cluster.length - 1
      }
    }
    // по вертикали
    for (let l = 0; l < this.rows - 2; l++) {
      let cluster = this.findVerticalClusters(l, coord.j)
      if (cluster.length > 2) {
        this.clusters.push(cluster)
        l += cluster.length - 1
      }
    }
    return this.clusters
  }

  /**
   * Разрушает руны (задает руне новый тип = 0) входящие в линию, количество разрушенных рун по типам добавляет в объект `destroyedRunes`,
   * очищает массив `clusters`
   * @return {Array.<coord>} Возвращает, массив координат разрушенных рун
   */
  deleteClusters () {
    let coordDestroyedRunes = []
    for (let l = 0; l < this.clusters.length; l++) {
      for (let t = 0; t < this.clusters[l].length; t++) {
        if (this.board[this.clusters[l][t].i][this.clusters[l][t].j] > 0) {
          coordDestroyedRunes.push({i: this.clusters[l][t].i, j: this.clusters[l][t].j})
          this.board[this.clusters[l][t].i][this.clusters[l][t].j] = 0
        }
      }
    }
    this.clusters = []
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
          if (this.board[i][j] === 0) {
            firstEmpty = i
          }
        } else {
          if (this.board[i][j] > 0) {
            this.swap({i, j}, {i: firstEmpty, j: j})
            coordDropedRunes.push([{i, j}, {i: firstEmpty, j: j}])
            firstEmpty--
          }
        }
      }
    }
    return coordDropedRunes
  }

  // TODO !!!
  generationRune (i, j) {
    let isRegion = false
    let random = 0
    console.log(this.runes)
    do {
      /* Math.random() */
      random = Math.floor(seedRandom(this.generationKey) * (this.runes.length)) + 1
      console.log(random - 1)

      if (i >= Math.round(this.rows / 100 * this.runes[random - 1].region.start.i) &&
          j >= Math.round(this.columns / 100 * this.runes[random - 1].region.start.j) &&
          i <= Math.round(this.rows / 100 * this.runes[random - 1].region.end.i) &&
          j <= Math.round(this.columns / 100 * this.runes[random - 1].region.end.j)
         ) {
        isRegion = true
      }
    } while (!isRegion)
    return random
  }

  /**
   * Пополняет поле, заменет пустые руны случайными рунами в пределах от 1 до `maxTypeGenerateRunes`
   * @return {Array.<coordAndType>} Возвращает, массив координаты и тип новых рун
   */
  refill () {
    let newRunes = []
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        if (this.board[i][j] === 0) {
          this.board[i][j] = this.generationRune(i, j)
          newRunes.push({i, j, type: 1})
        }
      }
    }
    return newRunes
  }
}

module.exports = Board
