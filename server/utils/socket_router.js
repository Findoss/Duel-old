/* eslint class-methods-use-this: 0 */
// правило отключено потому что это важыный элемент логов

const debug = require('../utils/debug');

module.exports = class Router {
  constructor(ctx) {
    this.ctx = ctx;
    this.routes = {};
  }

  /**
   * TODO описание
   * @param {*} path
   * @param {*} middlewares
   * @returns
   */
  async use(path, ...middlewares) {
    if (this.ctx.store.users[this.ctx.userId]) {
      if (this.ctx.store.users[this.ctx.userId].socket === undefined) {
        debug.log('               │ ERROR socket 500');
        return new Error('500');
      }

      const { socket } = this.ctx.store.users[this.ctx.userId];

      socket.on(path, (data) => {
        this.before(path, data);
        this.ctx.data = data;
        try {
          middlewares.forEach((middleware) => {
            this.beforeEach(data);
            try {
              middleware(this.ctx);
            } catch (error) {
              throw error;
            }
          });
        } catch (error) {
          this.error(error);
          this.after();
        }
      });
    }

    return this;
  }

  /**
   * TODO описание
   * @param {*} path
   * @param {*} middlewares
   * @returns
   */
  on(path, ...middlewares) {
    this.routes[path] = middlewares;
    return this;
  }

  /**
   * TODO описание
   *
   */
  async start() {
    const { route } = this.ctx.data;
    if (route in this.routes) {
      try {
        const result = await this.routes[route].reduce(
          (promiseChain, asyncFunction) => promiseChain.then(() => asyncFunction(this.ctx)),
          Promise.resolve(),
        );
        this.afterEach(result);
      } catch (error) {
        this.error(error);
      }
    } else {
      this.error('NOT MATCH');
    }
    this.after();
  }

  /**
   * Хук перед выполнением промежуточного ПО роута
   */
  before(path, data) {
    const { socket } = this.ctx.store.users[this.ctx.userId];
    debug.log(`──‣ ┈┈┈┈┈ SEND ┬ /${path}/${data.route}`);
    debug.log(`               │ id: ${this.ctx.userId || ''}`);
    debug.log(`               │ io: ${socket.id || ''}`);
    debug.log('               │ {');
    debug.log(data.gameId ? `               │   ${data.gameId}` : '');
    debug.log(data.payload ? `               │   ${data.payload}` : '');
    debug.log('               │ }');
    debug.log('               │');
  }

  /**
   * Хук перед выполнением каждого промежуточного ПО роута
   */
  beforeEach() { }

  /**
   * Хук после выполнениея каждого промежуточного ПО роута
   */
  afterEach(result) {
    const string = JSON.stringify(result, null, 2).replace(/\n/g, '\n               │ ');
    debug.log(`               │ ${string || ''}`);
  }

  /**
   * Хук после выполнениея всех промежуточных ПО роута
   */
  after() {
    debug.log('┈┈┈┈┈┈┈┈┈┈┈┈┈┈ ┴');
  }

  /**
   * Хук исключения при выполнении промежуточного ПО роута
   */
  error(error) {
    debug.log(`               │ ${error}`);
  }
};
