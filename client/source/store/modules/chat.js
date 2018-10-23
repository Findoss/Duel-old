import socket from '../socket';

const state = {
  messages: [],
};

const getters = {
  getMessages: state => (state.messages),
};

const actions = {
  send({}, message) {
    socket.emit('chat', { rout: '', payload: message });
  },
};

const mutations = {

  SOCKET_CHAT(state, message) {
    state.messages.push(message[0]);
  },

};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
