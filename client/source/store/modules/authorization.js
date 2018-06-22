import Router from '@/router';

// Services
import * as MeService from '@/services/me';
import * as StaticService from '@/services/static';
import * as UserService from '@/services/user';


const state = {
  alert: {
    type: 'error',
    message: '',
  },
};

// getters
const getters = {};

// actions
const actions = {

  registration({ commit }, user) {
    console.log(user);

    UserService.registration(user)
      .then((response) => {
        commit('showAlert', {
          type: 'success',
          message: response.message,
        });
      })
      .catch((error) => {
        console.warn(error);
      });
  },
};

// mutations
const mutations = {

  showAlert(state, alertData) {
    state.alert = alertData;
  },

};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
