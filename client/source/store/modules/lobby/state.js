import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
  time: 10,
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};