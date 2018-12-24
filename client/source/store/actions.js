import Router from '@/routes';

export default {
  socketChat({ dispatch }, { client, data }) {
    dispatch('addNotification', { type: 'info', message: data[0] }, { root: true });
  },

  socketLobbyComeIn() {
    Router.push({ name: 'lobby' });
  },

  socketLobbyExit({ state, commit }, { data }) {
    if (data[0] === 'exit') {
      commit('lobby/RESET_TIME');
      Router.push({ path: `/${state.myId}` });
    } else {
      commit('lobby/SET_TIME', 0);
    }
  },

  socketLobbyTime({ commit }, { data }) {
    commit('lobby/SET_TIME', data[0]);
  },

  socketLobbyToGame({ commit }, { data }) {
    commit('lobby/RESET_TIME');
    Router.push({ path: `/game/${data[0].gameId}` });
  },

  //
  addNotification({ commit }, notification) {
    commit('ADD_NOTIFICATION', notification);
  },

  delNotification({ commit }, index) {
    commit('DEL_NOTIFICATION', index);
  },
};
