module.exports = async (ctx, next) => {
  ctx.type = 'application/json; charset=utf-8;';
  await next();
};
