const actions = {
  socketChat({ commit }, { client, data }) {
    console.log('global chat ', data);
    commit('chat/SOCKET_CHAT', data);
  },
};

export default actions;
