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

  release () {
    let data = []
    if (this.events.length > 0) {
      data = this.events
    }
    this.clean()
    return data
  }

  clean () {
    this.events = []
  }
}

module.exports = Changes
