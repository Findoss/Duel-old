import { createSocketioPlugin } from 'vuex-socketio-plugin';

import Vue from 'vue';
import Vuex from 'vuex';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import socket from './socket';

import user from './modules/user';
import userPrivate from './modules/user_private';

import account from './modules/account';
import chat from './modules/chat';
import game from './modules/game';
import lobby from './modules/lobby';
import skills from './modules/skills';
import statics from './modules/statics';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    myId: '0000',
    statusSocket: false,
  },
  actions,
  mutations,
  getters,
  modules: {
    game, // модуль игровых объектов
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
  plugins: [createSocketioPlugin(socket, {
    actionPrefix: 'socket',
  })],
});
