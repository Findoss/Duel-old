import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

import user from './modules/user';
import skills from './modules/skills';
// import profile from './modules/profile';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  actions,
  mutations,
  getters,
  modules: {
    user,
    skills,
  },
});
