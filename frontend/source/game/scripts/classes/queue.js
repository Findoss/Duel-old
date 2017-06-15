class Queue {

  constructor() {
    this.isDraws = false;
    this.queue = [];
  }

  // add SINC
  add(context, command, args) {
    this.queue.push(
      [{
        context: context,
        command: command,
        args: args
      }]);
    this.play();
  }

  // add ASINC
  // TODO

  play() {
    if (!this.isDraws) {
      if (this.queue.length) {
        this.isDraws = true;
        let commands = this.queue.shift();
        for (let i = 0; i < commands.length; i++) {
          let anim = commands[i].context[commands[i].command].apply(commands[i].context, commands[i].args);
          // на макс по времени
          if (i == commands.length-1) {
            anim.onComplete.add(() => { 
              this.isDraws = false;
              this.play();
            });
          }
        }
      }
    }
  }

}

var queue = new Queue();