/* global Phaser */

class Queue {
  constructor () {
    this.isRender = false
    this.queue = []
    this.onPlay = new Phaser.Signal()
  }

  add (context, command, isBlocking, ...args) {
    this.queue.push([{context, command, isBlocking, args}])
    this.play()
  }

  play () {
    if (!this.isRender) {
      if (this.queue.length) {
        this.isRender = true
        let commands = this.queue.shift()
        for (let i = 0; i < commands.length; i++) {
          let anim = commands[i].context[commands[i].command].apply(commands[i].context, commands[i].args)
          this.onPlay.dispatch(commands[i])
          // TODO на макс по времени
          if (commands[i].isBlocking) {
            if (i === commands.length - 1) {
              anim.onComplete.add(() => {
                this.isRender = false
                this.play()
              })
            }
          } else {
            this.isRender = false
            this.play()
          }
        }
      }
    }
  }
}
