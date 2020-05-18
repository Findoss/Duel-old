/**
 * https://www.npmjs.com/package/concurrency-logger
 */

const config = require('../../config/index');
const createLogger = require('concurrency-logger').default;

const reqLogger = ctx => `${ctx.originalUrl}\n${JSON.stringify(ctx.request.body, null, 2)}\n `;

const resLogger = (ctx) => {
  const log = [];
  if (ctx.type === 'application/json') {
    if (!ctx.bodyd) {
      let string = String(JSON.stringify(ctx.body, null, 2));
      if (string.length >= 600) {
        string = string.substr(0, 600);
        string = string.concat('\n...');
      }
      log.push(string);
      log.push('\n');
    }
  } else log.push('index.html');
  return log.join('\n');
};

const options = {
  req: reqLogger,
  res: resLogger,
};

// const options = {};

module.exports = () => {
  if (config.logger.api) {
    return createLogger(options);
  }
  return async (ctx, next) => next();
};
