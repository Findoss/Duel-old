import Router from '@/routes';
import socket from '@/utils/socket';

export default {
  startGame({ commit }, data) {
    console.log(data);
    commit('lobby/RESET_TIME', null, { root: true });
    commit('SET_BOARD', data.newBoard);


    Router.replace({ name: 'game', params: { gameId: data.gameId, force: true } });
  },

  endGame() {
    console.log('endGame');
    Router.replace({ name: 'gameEnd', params: { force: true } });
  },

  surrender() {
    console.log('surrender');
    socket.emit('game', { route: 'surrender' });
  },
};