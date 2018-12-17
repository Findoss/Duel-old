import { createSocketioPlugin } from 'vuex-socketio-plugin';

import Vue from 'vue';
import Vuex from 'vuex';

import socket from '../utils/socket';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

import user from './modules/user/state';
import account from './modules/user/account/state';
import userPrivate from './modules/user/user_private/state';

import chat from './modules/chat/state';
import lobby from './modules/lobby/state';
import skills from './modules/skills/state';
import statics from './modules/statics/state';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    myId: '0000',
    statusSocket: false,
    notifications: [],
  },
  actions,
  mutations,
  getters,
  modules: {
    chat, // TODO описание
    lobby, // TODO описание
    skills, // модуль скилов
    statics, // модуль статичных набров
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
  // plugins: [createSocketioPlugin(socket, {
  //   actionPrefix: 'socket',
  // })],
});
