import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

import authorization from './modules/authorization';
import user from './modules/user';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    authorization,
    user,
  },
  actions,
  mutations,
  getters,
});
