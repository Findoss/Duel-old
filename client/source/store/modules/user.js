import Http from '@/utils/http';
import Router from '@/router';

import signin from './signin';

const state = {
  id: 0,
  nickname: '',
  email: '',
  avatar: 'null',
  rank: 0,
  gold: 0,
  level: 0,
  experience: 0,
  karma: 10,
  skillPoints: 10,
  selectedSkills: [],
  unlockedSkills: [],
  parameters: {
    health: 0,
    force: 0,
    energy_1: 0,
    energy_2: 0,
    energy_3: 0,
    armor: 0,
    rage: 0,
    luck: 0,
    block: 0,
  },
};

const getters = {};

const actions = {
  loadMe({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      Http.get('/me')
        .then((response) => {
          commit('setUserData', response);
        })
        .catch((error) => {
          // SessionService.signOut();
          dispatch('signin/showAlert', {
            type: 'error',
            message: error.message,
          });
          Router.push({ path: '/signin' });
        });
    });
  },

  loadUserParameters({ commit }) {
    Http.get('/static/user-parameters')
      .then((response) => {
        commit('setUserParameters', response);
      });
  },

  loadAvatarsList(ctx) {
    return new Promise((resolve, reject) => {
      Http.get('/static/avatars')
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  registration({ dispatch }, user) {
    return new Promise((resolve, reject) => {
      Http.send('POST', '/users', user)
        .then((response) => {
          dispatch('signin/showAlert', {
            type: 'success',
            message: response.message,
          });
          Router.push({ path: '/signin' });
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  deleteAccount({ dispatch }) {
    return new Promise((resolve, reject) => {
      if (confirm('Once you delete your account, there is no going back. Please be certain.')) {
        Http.send('DELETE', '/me')
          .then((response) => {
            localStorage.removeItem('session-token');
            dispatch('signin/showAlert', {
              type: 'info',
              message: response.message,
            });
            Router.push({ path: '/signin' });
          });
      }
    });
  },

  updateAccauntData(ctx, payload) {
    return new Promise((resolve, reject) => {
      const { field } = payload;
      const { data } = payload;
      Http.send('PATCH', `/me/${field}`, { field: data })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  loadScoreboard(ctx) {
    return new Promise((resolve, reject) => {
      Http.get('/users')
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // newPassword({ dispatch }, password) {
  //   // ...
  // },

  // resetPassword({ dispatch }, email) {
  //   // ...
  // },

  signIn({ dispatch }, user) {
    return new Promise((resolve, reject) => {
      Http.send('POST', '/signin', user)
        .then((response) => {
          localStorage.setItem('session-token', response.token);
          Router.push({ path: '/profile' });
        })
        .catch((error) => {
          dispatch('signin/showAlert', {
            type: 'error',
            message: error.message,
          });
          reject(error);
        });
    });
  },

  signOut({ dispatch }) {
    Http.send('DELETE', '/signout')
      .then((response) => {
        localStorage.removeItem('session-token');
        dispatch('signin/showAlert', {
          type: 'info',
          message: response.message,
        });
        Router.push({ path: '/signin' });
      })
      .catch((error) => {
        dispatch('signin/showAlert', {
          type: 'error',
          message: error.message,
        });
      });
  },


};

const mutations = {
  setUserData(state, userData) {
    state.id = userData.id;
    state.nickname = userData.nickname;
    state.email = userData.email;
    state.avatar = userData.avatar;
    state.rank = userData.rank;
    state.gold = userData.gold;
    state.level = userData.level;
    state.experience = userData.experience;
    state.karma = userData.karma;
    state.skillPoints = userData.skillPoints;
    state.selectedSkills = userData.selectedSkills;
    state.unlockedSkills = userData.unlockedSkills;
  },

  setAvatar(state, avatar) {
    state.avatar = avatar;
  },

  setUserParameters(state, parameters) {
    state.parameters = parameters;
  },
};

const modules = {
  signin,
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules,
};
