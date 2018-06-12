const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const router = new Router();

function getAll() {
  return new Promise((resolve, reject) => {
    resolve({ hello: 'world' });
  });
}


router
  .get('/product', async (ctx, next) => {
    ctx.body = await getAll();
  });
// .get('/product/:id', async (ctx, next) => {
//   let result = await product.get(ctx.params.id);
//   if (result) {
//     ctx.body = result
//   } else {
//     ctx.status = 204
//   }
// })
// .post('/product', koaBody, async (ctx, next) => {
//   ctx.status = 201;
//   ctx.body = await product.create(ctx.request.body)
// })
// .put('/product/:id', koaBody, async (ctx, next) => {
//   ctx.status = 204;
//   await product.update(ctx.params.id, ctx.request.body);
// })
// .delete('/product/:id', async (ctx, next) => {
//   ctx.status = 204;
//   await product.delete(ctx.params.id);
// });

module.exports = () => router.routes();
