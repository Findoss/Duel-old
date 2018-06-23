const state = {
  alert: {
    type: 'error',
    message: '',
  },
};

const getters = {};

const actions = {
  showAlert({ commit }, alert) {
    commit('setAlert', alert);
  },
};

const mutations = {

  setAlert(state, alert) {
    state.alert = alert;
  },

};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
