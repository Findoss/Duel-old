const debug = require('../../utils/debug');
const logger = require('./logger');

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

      socket.on(path, async (data) => {
        this.before(path, data);
        this.ctx.data = data;
        try {
          await middlewares.reduce(
            (promiseChain, asyncFunction) => promiseChain.then(() => asyncFunction(this.ctx)),
            Promise.resolve(),
          );
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
    logger.beforeRoute(this.ctx, path, data);
  }

  /**
   * Хук перед выполнением каждого промежуточного ПО роута
   */
  beforeEach() { }

  /**
   * Хук после выполнениея каждого промежуточного ПО роута
   */
  afterEach() { }

  /**
   * Хук после выполнениея всех промежуточных ПО роута
   */
  after() { }

  /**
   * Хук исключения при выполнении промежуточного ПО роута
   */
  error(error) {
    logger.errorRoute(error);
  }
};
