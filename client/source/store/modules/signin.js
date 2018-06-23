const state = {
  alert: {
    type: 'error',
    message: '',
  },
};

const getters = {};

const actions = {};

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
