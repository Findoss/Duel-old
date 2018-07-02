const state = {
  alert: {
    type: 'error',
    message: '',
  },
};

const getters = {};

const actions = {
  showAlert({ commit }, alert) {
    commit('SET_ALERT', alert);
  },
};

const mutations = {

  SET_ALERT(state, alert) {
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
