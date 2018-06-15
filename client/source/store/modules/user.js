import Router from '@/router';

// Services
import * as MeService from '@/services/me';
import * as SessionService from '@/services/session';

const state = {
  user: {
    nickname: '',
    email: '',
    avatar: 'null',
    rank: 0,
    gold: 0,
    level: 0,
    experience: 0,
    karma: false,
    skillPoints: 10,
    idSkills: [],
  },
};

const getters = {};

const actions = {
  getMe({ commit }) {
    MeService.getMe()
      .then((response) => {
        commit('setUserData', response);
      })
      .catch((error) => {
        console.warn(error);
        SessionService.signOut();
        Router.push({ path: '/signin' });
      });
  },
};

const mutations = {
  setUserData(state, userData) {
    state.user = userData;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
