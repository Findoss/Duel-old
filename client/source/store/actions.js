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
      Router.replace({ name: 'profile', params: { userId: state.myId, force: true } });
    } else {
      commit('lobby/SET_TIME', 0);
    }
  },

  socketLobbyTime({ commit }, { data }) {
    commit('lobby/SET_TIME', data[0]);
  },

  socketGameChanges({ dispatch }, { data }) {
    console.log(data);

    data[0].forEach((event) => {
      dispatch(`game/${event.event}`, event.data);
    });
  },

  //
  addNotification({ commit }, notification) {
    commit('ADD_NOTIFICATION', notification);
  },

  delNotification({ commit }, key) {
    commit('DEL_NOTIFICATION', key);
  },
};
