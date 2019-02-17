import Router from '@/routes';
import socket from '@/utils/socket';

export default {
  startGame({ rootState, commit }, data) {
    commit('lobby/RESET_TIME', null, { root: true });
    commit('me/SET_GAME_ID', data.gameId, { root: true });
    commit('START_GAME', data);

    const opponent = data.users.find(user => user.id !== rootState.myId);
    commit('opponent/SET_AVATAR', opponent.avatar, { root: true });
    commit('opponent/SET_NICKNAME', opponent.nickname, { root: true });

    Router.replace({ name: 'game', params: { gameId: data.gameId, force: true } });
  },

  endGame({ commit }) {
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