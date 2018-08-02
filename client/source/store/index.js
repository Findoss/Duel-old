import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

import user from './modules/user';
import skills from './modules/skills';
import statics from './modules/statics';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    myId: 0,
  },
  actions,
  mutations,
  getters,
  modules: {
    user,
    skills,
  },
});
