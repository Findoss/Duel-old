import Router from '@/routes';

export default {
  startGame({ commit }, data) {
    console.log(data);
    commit('lobby/RESET_TIME', null, { root: true });
    commit('SET_BOARD', data.newBoard);


    Router.replace({ name: 'game', params: { gameId: data.gameId, force: true } });
  },
};