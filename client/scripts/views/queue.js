/**
 * Очередь команд/анимаци
 * ** ! ВАЖНО ** функции могут вставать в очередь в блокирущем режиме только если возвращают `Phaser.Tween` или `Phaser.Animation` или вызывают событие `onComplete` (`Phaser.Signal`)
 * @class
 * @fires Queue
 */
class Queue {
  /**
   * @constructor
   */
  constructor() {
    /**
     * Состояние очереди
     * TRUE  - исполение команд/анимаций
     * FALSE - ожидание команд/анимаций
     * @protected
     * @type {Boolean}
     * @default false
     */
    this.isRender = false;
    /**
     * Очередь
     * @type {Array}
     */
    this.queue = [];
  }

  /**
   * Добавляет анимацию в очередь и вызывает функцию (`play()`)
   * @param {Object}  context    Контекст в котором будет исполняться анимация/команда
   * @param {String}  command    Название команды/анимации
   * @param {Boolean} isBlocking TRUE - блокирущий режим
   *                             FALSE - НЕ блокирущий режим (запускает сразу следущюю анимацию)
   * @param {...*}    args       Параметры команды/анимации
   */
  add(context, command, isBlocking, ...args) {
    this.queue.push({
      context, command, isBlocking, args,
    });
    this.play();
  }

  /**
   * Воспроизведение команды/анимации из очереди (рекурсия)
   */
  play() {
    if (!this.isRender) {
      if (this.queue.length) {
        this.isRender = true;
        const command = this.queue.shift();
        const anim = command.context[command.command].apply(command.context, command.args);
        if (command.isBlocking) {
          anim.onComplete.add(() => {
            this.isRender = false;
            this.play();
          });
        } else {
          this.isRender = false;
          this.play();
        }
      }
    }
  }
}

module.exports = Queue;
