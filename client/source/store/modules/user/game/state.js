import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
  health: {
    value: 100,
    limit: 100,
  },
  resources: {
    energy_1: 0,
    energy_2: 0,
    energy_3: 0,
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
