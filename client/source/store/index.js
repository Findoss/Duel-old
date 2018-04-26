import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    alert: {
      type: 'error',
      message: '',
    },
  },
  mutations: {
    newAlert(state, payload) {
      state.alert = payload;
    },
  },
  actions: {

  },
});
