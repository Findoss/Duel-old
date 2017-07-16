/* global Phaser */

/**
 * Очередь анимации
 * @class
 * @fires Queue
 */
class Queue {
  /**
   * @constructor
   */
  constructor () {
    /**
     * Состояние очереди
     * @type {Boolean}
     * @default false
     */
    this.isRender = false
    /**
     * Очередь
     * @type {Array}
     */
    this.queue = []
    /**
     * Вызывается после началом проигрывания очередной анимации/команды
     * @event Queue#onPlay
     */
    this.onPlay = new Phaser.Signal()
    /**
     * Вызывается после добаления анимации/команды в очередь
     * @event Queue#onAdd
     */
    this.onAdd = new Phaser.Signal()
  }

  /**
   * Добавляет анимацию в очередь и вызывает функцию (`play()`)
   * @param {Object}  context    контекст в котором будет исполняться анимация/команда
   * @param {String}  command    название анимация/команда
   * @param {Boolean} isBlocking TRUE - блокирущая очередь анимация/команда
   *                             FALSE - НЕ блокирущая очередь анимация/команда
   * @param {...*}    args       параметры команды
   */
  add (context, command, isBlocking, ...args) {
    this.queue.push([{context, command, isBlocking, args}])
    this.onAdd.dispatch(command)
    this.play()
  }

  /**
   * Воспроизведение анмации из очереди (рекурсия)
   */
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
