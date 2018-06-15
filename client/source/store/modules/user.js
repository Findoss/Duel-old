// Services
import * as MeService from '@/services/me';

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
        // this.user = response;
        // this.loading = true;
      })
      .catch((error) => {
        console.warn(error);
        // SessionService.signOut();                 // ????
        // this.$router.push({ path: '/signin' });   // ????
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
