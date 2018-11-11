export default {
  // socketChat({ commit }, { client, data }) {
  //   commit('chat/SOCKET_CHAT', data);
  // },

  socketLobbyTime({ commit }, { data }) {
    commit('chat/SOCKET_CHAT', [{ user: 'you', message: data[0] }]);
  },

  socketLobbyExit({ commit }, { data }) {
    commit('chat/SOCKET_CHAT', [{ user: 'you', message: data[0] }]);
  },

  socketLobbyGo({ commit }, { data }) {
    commit('chat/SOCKET_CHAT', [{ user: 'you', message: data[0] }]);
  },
};
