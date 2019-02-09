import Router from '@/routes';
import socket from '@/utils/socket';

export default {
  startGame({ commit }, data) {
    commit('lobby/RESET_TIME', null, { root: true });
    commit('me/SET_GAME_ID', data.gameId, { root: true });
    commit('START_GAME', data);

    console.log(data);


    Router.replace({ name: 'game', params: { gameId: data.gameId, force: true } });
  },

  endGame({ commit }) {
    console.log('endGame');

    commit('me/SET_GAME_ID', '', { root: true });
    Router.replace({ name: 'gameEnd', params: { force: true } });
  },

  restore({ }, gameId) {
    socket.emit('game', { route: 'restore', payload: gameId });
  },

  surrender({ commit }) {
    commit('me/SET_GAME_ID', null, { root: true });
    socket.emit('game', { route: 'surrender' });
  },
};