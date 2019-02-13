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
        Router.before(this.ctx, path, data);
        this.ctx.data = data;
        try {
          await middlewares.reduce(
            (promiseChain, asyncFunction) => promiseChain.then(() => asyncFunction(this.ctx)),
            Promise.resolve(),
          );
        } catch (error) {
          Router.error(error);
          Router.after();
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
        Router.afterEach(result);
      } catch (error) {
        Router.error(error);
      }
    } else {
      Router.error('NOT MATCH');
    }
    Router.after();
  }

  /**
   * Хук перед выполнением промежуточного ПО роута
   */
  static before(ctx, path, data) {
    logger.beforeRoute(ctx, path, data);
  }

  /**
   * Хук перед выполнением каждого промежуточного ПО роута
   */
  static beforeEach() { }

  /**
   * Хук после выполнениея каждого промежуточного ПО роута
   */
  static afterEach() { }

  /**
   * Хук после выполнениея всех промежуточных ПО роута
   */
  static after() { }

  /**
   * Хук исключения при выполнении промежуточного ПО роута
   */
  static error(error) {
    logger.errorRoute(error);
  }
};
