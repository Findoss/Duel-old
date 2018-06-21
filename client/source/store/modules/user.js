import Router from '@/router';

// Services
import * as MeService from '@/services/me';
import * as StaticService from '@/services/static';
import * as SessionService from '@/services/session';

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
  idSkills: [],
  parameters: {
    health: 100,
    force: 10,
    energy_1: 3,
    energy_2: 3,
    energy_3: 3,
    armor: 5,
    rage: 5,
    luck: 5,
    block: 5,
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
    StaticService.getUserParameters()
      .then((response) => {
        commit('setUserParameters', response);
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
    state.idSkills = userData.idSkills;
  },

  setAvatar(state, avatar) {
    state.avatar = avatar;
  },

  setUserParameters(state, userData) {
    state.parameters = userData.parameters;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
