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

  clean () {
    this.events = []
  }
}

module.exports = Changes
