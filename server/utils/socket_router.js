/* eslint class-methods-use-this: 0 */
// правило отключено потому что это важыный элемент логов

const config = require('../config');

module.exports = class Router {
  constructor(ctx) {
    this.ctx = ctx;
    this.routes = {};
  }

  async use(path, ...middlewares) {
    if (this.ctx.store.players[this.ctx.userId]) {
      if (this.ctx.store.players[this.ctx.userId].socket === undefined) {
        console.error('socket');
        return new Error('500');
      }

      const { socket } = this.ctx.store.players[this.ctx.userId];

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

  on(path, ...middlewares) {
    this.routes[path] = middlewares;
    return this;
  }

  async start() {
    const { route } = this.ctx.data;
    if (route in this.routes) {
      try {
        this.routes[route].forEach((middleware) => {
          try {
            const result = middleware(this.ctx);
            this.afterEach(result);
          } catch (error) {
            throw error;
          }
        });
      } catch (error) {
        this.error(error);
      }
    } else {
      this.error('NOT MATCH');
    }
    this.after();
  }

  before(path, data) {
    if (config.logger.game) {
      const { socket } = this.ctx.store.players[this.ctx.userId];
      console.log(`──‣ ┈┈┈┈┈ SEND ┬ /${path}/${data.route}`);
      console.log(`               │ id: ${this.ctx.userId || ''}`);
      console.log(`               │ io: ${socket.id || ''}`);
      console.log('               │');
      console.log('               │ {');
      if (data.gameId) console.log(`               │   ${data.gameId}`);
      if (data.payload) console.log(`               │   ${data.payload}`);
      console.log('               │ }');
      console.log('               │');
    }
  }

  beforeEach(data) {
  }

  afterEach(result) {
    if (config.logger.game) {
      const string = JSON.stringify(result, null, 2).replace(/\n/g, '\n               │ ');
      console.log(`               │ ${string}` || '');
    }
  }

  after() {
    if (config.logger.game) {
      console.log('┈┈┈┈┈┈┈┈┈┈┈┈┈┈ ┴');
    }
  }

  error(error) {
    if (config.logger.game) {
      console.log(`               │ ${error}`);
    }
  }
};
