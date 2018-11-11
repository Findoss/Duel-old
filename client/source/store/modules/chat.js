/* eslint no-param-reassign: 0 */
/* eslint no-shadow: 0 */

import socket from '../socket';

const state = {
  messages: [],
};

const getters = {
  getMessages: state => state.messages,
};

const actions = {
  send({ }, message) {
    socket.emit('chat', { route: '', payload: message });
  },
};

const mutations = {

  SOCKET_CHAT(state, data) {
    state.messages.push(data[0]);
  },

};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
