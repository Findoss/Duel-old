module.exports = () => async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    ctx.status = error.code || error.status || 500;
    ctx.body = {
      message: error.message,
    };
  }
};
