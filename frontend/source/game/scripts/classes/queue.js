class Queue {

  constructor() {
    this.flag = true;
    this.queue = [];
  }

  push(tweenGroup) {
    this.queue.push(tweenGroup);
  }

  add(tweenGroup) {
    if (this.queue.length) {
      tweenGroup.forEach((tween) => {
        this.queue[this.queue.length - 1].push(tween);
      });
    } else this.push(tweenGroup);
  }

  play() {
    if (this.flag) {
      this.flag = false;
      if (this.queue.length) {

        let tweenGroup = this.queue.shift();
        tweenGroup[tweenGroup.length - 1].onComplete.add(() => {
          this.flag = true;
        });
        tweenGroup.forEach((tween) => {
          tween.start()
        });

      } else {
        this.flag = true;
      }
    }
  }

}

var queue = new Queue();