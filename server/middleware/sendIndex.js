const send = require('koa-send');

module.exports = async (ctx, next) => {
  ctx.type = 'text/html; charset=utf-8;';
  await send(ctx, '/index.html', { root: '../client/build/' });
  await next();
};
