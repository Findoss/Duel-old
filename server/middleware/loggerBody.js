module.exports = async (ctx, next) => {
  console.log('  <-- REQ ', ctx.request.body);
  await next();
  // console.log('  --> RES ', ctx.response.body);
};
