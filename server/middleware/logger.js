const config = require('../config/index');
const createLogger = require('concurrency-logger').default;

const reqLogger = (ctx) => {
  if (config.logger.koa) {
    return `${ctx.originalUrl}\n${JSON.stringify(ctx.request.body, null, 2)}\n `;
  }
  return '';
};

const resLogger = (ctx) => {
  const log = [];
  if (config.logger.koa) {
    if (ctx.type === 'application/json') log.push(JSON.stringify(ctx.body, null, 2));
    else log.push('index.html');
    return log.join('\n');
  }
  return '';
};


module.exports = () => createLogger({
  req: reqLogger,
  res: resLogger,
});
