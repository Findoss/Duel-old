/* global Phaser */

class Queue {
  constructor () {
    this.isDraws = false
    this.queue = []
    this.onPlay = new Phaser.Signal()
  }

  add (context, command, args) {
    this.queue.push(
      [{
        context: context,
        command: command,
        args: args
      }])
    this.play()
  }

  play () {
    if (!this.isDraws) {
      if (this.queue.length) {
        this.isDraws = true
        let commands = this.queue.shift()
        for (let i = 0; i < commands.length; i++) {
          let anim = commands[i].context[commands[i].command].apply(commands[i].context, commands[i].args)
          this.onPlay.dispatch(commands[i])
          // TODO на макс по времени
          if (i === commands.length - 1) {
            anim.onComplete.add(() => {
              this.isDraws = false
              this.play()
            })
          }
        }
      }
    }
  }
}
