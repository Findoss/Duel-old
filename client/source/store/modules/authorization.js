// initial state
const state = {
  alert: {
    type: 'error',
    message: '',
  },
};

// getters
const getters = {};

// actions
const actions = {};

// mutations
const mutations = {

  showAlert(state, alertData) {
    state.alert = alertData;
  },

};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
