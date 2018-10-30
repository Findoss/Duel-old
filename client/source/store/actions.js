const actions = {
  socketChat({ commit }, { client, data }) {
    commit('chat/SOCKET_CHAT', data);
  },
};

export default actions;
