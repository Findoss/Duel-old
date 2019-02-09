import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
  board: [[]],
  timer: 30,
  stepUser: '',
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};