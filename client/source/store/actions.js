export default {
  socketChat({ dispatch }, { client, data }) {
    const message = `${data[0].user} - ${data[0].message}`;
    dispatch('addNotification', { type: 'info', message }, { root: true });
  },

  socketLobbyTime({ commit }, { data }) {
    commit('chat/SOCKET_CHAT', [{ user: 'you', message: data[0] }]);
  },

  socketLobbyExit({ commit }, { data }) {
    commit('chat/SOCKET_CHAT', [{ user: 'you', message: data[0] }]);
  },

  socketLobbyGo({ commit }, { data }) {
    commit('chat/SOCKET_CHAT', [{ user: 'you', message: data[0] }]);
  },

  addNotification({ commit }, notification) {
    commit('ADD_NOTIFICATION', notification);
  },

  delNotification({ commit }, index) {
    commit('DEL_NOTIFICATION', index);
  },
};
