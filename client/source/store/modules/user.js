import Http from '@/utils/http';
import Router from '@/router';

import signin from './signin';

const state = {
  avatar: 'null',
  email: 'null',
  experience: 0,
  gold: 0,
  id: 0,
  karma: 1,
  level: 0,
  limitSlots: 8,
  nickname: 'null',
  openSlots: 3,
  points: 0,
  rank: 0,
  skillSet: [],
  skillsUnlocked: [],
  parameters: {
    armor: 0,
    block: 0,
    force: 0,
    health: 0,
    luck: 0,
    rage: 0,
    resources: {
      energy_1: 0,
      energy_2: 0,
      energy_3: 0,
    },
  },
};

const getters = {
  getAllUserData: state => state,

  getSkillsSet: (state) => {
    const skillsSet = [];
    for (let i = 0; i < state.limitSlots; i++) {
      if (state.skillSet[i] !== undefined) {
        skillsSet.push(state.skillSet[i]);
      } else if (i >= state.openSlots) {
        skillsSet.push(-2); // lock
      } else {
        skillsSet.push(-1); // empty
      }
    }
    return skillsSet;
  },

  getCountSkillsClones: state => (id) => {
    let countClone = 0;
    state.skillSet.forEach((skill) => {
      if (skill === id) countClone += 1;
    });
    return countClone;
  },
};

const actions = {
  loadMe({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      Http.get('/me')
        .then((response) => {
          commit('SET_USER_DATA', response);
        })
        .catch((error) => {
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
        commit('SET_USER_PARAMETERS', response);
      });
  },

  delInSkillSet({ commit }, id) {
    const { points } = this.getters['skills/getSkillInfo'](id);
    return new Promise((resolve, reject) => {
      Http.send('DELETE', '/me/skillsset', { skillsset: [id] })
        .then((response) => {
          commit('DEL_SKILL_IN_SET', id);
          commit('RESET_POINTS', points);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  },

  addInSkillSet({ commit }, id) {
    const { points } = this.getters['skills/getSkillInfo'](id);
    return new Promise((resolve, reject) => {
      Http.send('PATCH', '/me/skillsset', { skillsset: [id] })
        .then((response) => {
          commit('ADD_SKILL_IN_SET', id);
          commit('EXPENSES_POINTS', points);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  },

  buySkill({ state, commit }, id) {
    const { priceInGold } = this.getters['skills/getSkillInfo'](id);
    return new Promise((resolve, reject) => {
      Http.send('POST', '/me/buyskill', { id })
        .then((response) => {
          commit('UNLOCK_SKILL', id);
          commit('EXPENSES_GOLD', priceInGold);
        })
        .catch((error) => {
          console.log(error);
        });
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
  SET_USER_DATA(state, userData) {
    state.id = userData.id;
    state.nickname = userData.nickname;
    state.email = userData.email;
    state.avatar = userData.avatar;
    state.rank = userData.rank;
    state.gold = userData.gold;
    state.level = userData.level;
    state.experience = userData.experience;
    state.karma = userData.karma;
    state.openSlots = userData.openSlots;
    state.points = userData.points;
    state.skillSet = userData.skillSet;
    state.skillsUnlocked = userData.skillsUnlocked;
  },

  SET_USER_PARAMETERS(state, parameters) {
    state.parameters = parameters;
  },

  SET_AVATAR(state, avatar) {
    state.avatar = avatar;
  },

  DEL_SKILL_IN_SET(state, idSkill) {
    state.skillSet.splice(state.skillSet.indexOf(idSkill), 1);
  },

  ADD_SKILL_IN_SET(state, idSkill) {
    state.skillSet.push(idSkill);
  },

  UNLOCK_SKILL(state, idSkill) {
    state.skillsUnlocked.push(idSkill);
  },

  EXPENSES_GOLD(state, number) {
    state.gold -= number;
  },

  EXPENSES_POINTS(state, number) {
    state.points -= number;
  },

  RESET_POINTS(state, number) {
    state.points += number;
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
