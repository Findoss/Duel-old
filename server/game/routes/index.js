/* eslint no-console: 0 */
// правило отключено потому что это важыный элемент логов, необходимо вынести в модуль

const Router = require('../../utils/socket_router');

const routeLobby = require('./lobby');
const routeGame = require('./game');
const routeDashboard = require('./dashboard');

module.exports = (ctx) => {
  const router = new Router(ctx);

  router.use('dashboard', routeDashboard); // TODO добавить проверку на права
  router.use('game', routeGame); // TODO добавить проверку что игрок в игре и такая игра есть
  router.use('lobby', routeLobby);

  router.use('chat', () => {
    const { data } = ctx;
    ctx.store.io.emit('Chat', { user: ctx.userId, message: data.payload });
    console.log('──‣ ┈┈┈┈┈ SEND ┬ chat');
    console.log('               │');
    console.log(`               │ ${data.payload}`);
    console.log('               │');
    console.log(`┈┈┈┈┈┈┈┈┈┈┈┈┈┈ ┴ ${data.payload}`);
  });
};
