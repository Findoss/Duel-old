import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

import user from './modules/user';
import userPrivate from './modules/user_private';

import skills from './modules/skills';
import statics from './modules/statics';
import account from './modules/account';

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
    skills, // модуль скилов
    statics, // модуль сьатичных набров
    me: { // модуль пользователя
      namespaced: user.namespaced,
      state: user.state,
      getters: user.getters,
      actions: user.actions,
      mutations: user.mutations,
      modules: { // расширающие модули пользователя
        account, // модуль сессия пользователя
        private: userPrivate, // модуль приватных данных и действий пользователя
      },
    },
    opponent: user,
  },
});
