const send = require('koa-send');

module.exports = () => async (ctx, next) => {
  if (ctx.response.status !== 200 && ctx.response.status !== 201) {
    ctx.type = 'text/html; charset=utf-8;';
    await send(ctx, '/index.html', { root: '../client/build/' });
  }
  await next();
};
