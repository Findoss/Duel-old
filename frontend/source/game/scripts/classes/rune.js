class Rune {
  constructor (type) {
    this.type = type
  }

  newType (type) {
    this.type = type
  }

  newRandomType (count) {
    this.type = Math.floor(Math.random() * (count)) + 1
    return this.type
  }
}
