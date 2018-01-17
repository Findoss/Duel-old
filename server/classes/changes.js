/**
 * @class
 */
class Changes {
  constructor () {
    this.events = []
  }

  add (event, data) {
    this.events.push({event, data})
  }

  isEmpty () {
    return this.events.length < 0
  }

  clean () {
    this.events = []
  }
}

module.exports = Changes
