

/* eslint no-param-reassign: 0 */
/* eslint no-shadow: 0 */
import socket from '../socket';

const state = {
  time: 10,
};

const getters = {};

const actions = {
  add() {
    socket.emit('lobby', { route: 'add' });
  },
  del() {
    socket.emit('lobby', { route: 'del' });
  },
};

const mutations = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
