const actions = {
  // socketChat({ commit }, { client, data }) {
  //   commit('chat/SOCKET_CHAT', data);
  // },

  socketLobbyTime({ commit }, { client, data }) {
    commit('chat/SOCKET_CHAT', [{ user: 'you', message: data[0] }]);
  },

  socketLobbyExit({ commit }, { client, data }) {
    commit('chat/SOCKET_CHAT', [{ user: 'you', message: data[0] }]);
  },

  socketLobbyGo({ commit }, { client, data }) {
    commit('chat/SOCKET_CHAT', [{ user: 'you', message: data[0] }]);
  },
};

export default actions;
