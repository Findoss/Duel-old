import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
  board: [[]],
  idStepTimer: null,
  currentStepTime: 30000,
  stepTime: 30000,
  stepUser: '',
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};