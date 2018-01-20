/* global Phaser */

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
  constructor () {
    /**
     * Состояние очереди
     * TRUE  - исполение команд/анимаций
     * FALSE - ожидание команд/анимаций
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
     * Вызывается после запуска проигрывания очередной команды/анимации
     * @event Queue#onPlay
     */
    this.onPlay = new Phaser.Signal()
    /**
     * Вызывается после добаления команды/анимации в очередь
     * @event Queue#onAdd
     */
    this.onAdd = new Phaser.Signal()
  }

  /**
   * Добавляет анимацию в очередь и вызывает функцию (`play()`)
   * @param {Object}  context    Контекст в котором будет исполняться анимация/команда
   * @param {String}  command    Название команды/анимации
   * @param {Boolean} isBlocking TRUE - блокирущий режим
   *                             FALSE - НЕ блокирущий режим (запускает сразу следущюю анимацию)
   * @param {...*}    args       Параметры команды/анимации
   */
  add (context, command, isBlocking, ...args) {
    this.queue.push({context, command, isBlocking, args})
    this.onAdd.dispatch(command)
    this.play()
  }

  /**
   * Воспроизведение команды/анимации из очереди (рекурсия)
   */
  play () {
    if (!this.isRender) {
      if (this.queue.length) {
        this.isRender = true
        let command = this.queue.shift()
        let anim = command.context[command.command].apply(command.context, command.args)
        this.onPlay.dispatch(command)
        if (command.isBlocking) {
          anim.onComplete.add(() => {
            this.isRender = false
            this.play()
          })
        } else {
          this.isRender = false
          this.play()
        }
      }
    }
  }
}

module.exports = Queue
