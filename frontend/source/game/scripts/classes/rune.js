class Rune {
  constructor (type) {
    this.type = type
    this.oldType = 0
  }

  newType (type) {
    this.oldType = this.type
    this.type = type
  }

  newRandomType (count) {
    this.oldType = this.type
    this.type = Math.floor(Math.random() * (count)) + 1
    return this.type
  }
}
