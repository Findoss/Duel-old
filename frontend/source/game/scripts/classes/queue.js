class Queue {

  constructor() {
    this.isDraws = false;
    this.queue = [];
  }

  add(context, command, args) {
    this.queue.push(
      [{
        context: context,
        command: command,
        args: args
      }]);
  }

  /*addTODO(commands) {
    if (this.queue.length) {
      commands.forEach((command) => {
        this.queue[this.queue.length - 1].add(command.context, command.command, command.arg);
      });
    } else this.push(tweenGroup);
  }*/

  play() {
    if (!this.isDraws) {
      if (this.queue.length) {
        this.isDraws = true;
        let commands = this.queue.shift();
        for (let i = 0; i < commands.length; i++) {
          let anim = commands[i].context[commands[i].command].apply(commands[i].context, commands[i].args);
          // на макс по времени
          if (i == commands.length-1) {
            anim.onComplete.add(() => { this.isDraws = false; });
          }
        }
      }
    }
  }

}

var queue = new Queue();