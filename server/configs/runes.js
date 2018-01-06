/* limit for 36
 * 3 = 1
 * 20 = 7
 * 28 = 10
 */
module.exports = [
  { // красный
    limit: 20,
    region: {
      start: {i: 0, j: 0},
      end: {i: 100, j: 100}
    }
  },
  { // фиолетовый
    limit: 20,
    region: {
      start: {i: 0, j: 0},
      end: {i: 100, j: 100}
    }
  },
  { // зеленый
    limit: 28,
    region: {
      start: {i: 0, j: 0},
      end: {i: 100, j: 100}
    }
  },
  { // желтый
    limit: 28,
    region: {
      start: {i: 0, j: 0},
      end: {i: 100, j: 100}
    }
  },
  { // синий
    limit: 28,
    region: {
      start: {i: 0, j: 0},
      end: {i: 100, j: 100}
    }
  },
  { // радуга
    limit: 3,
    region: {
      start: {i: 20, j: 20},
      end: {i: 80, j: 100}
    }
  }
]
