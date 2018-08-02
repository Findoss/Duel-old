import Http from '@/utils/http';
import Router from '@/router';

const state = {
  alertSignin: { // оповещение при входе
    type: 'error', // тип оповещения
    message: '', // сообщение оповещения
  },
};

const getters = {};

const actions = {
  showAlertSignin({ commit }, alert) {
    commit('SET_ALERT', alert);
  },

  registration({ dispatch }, user) {
    return new Promise((resolve, reject) => {
      Http.send('POST', '/users', user)
        .then((response) => {
          dispatch('showAlertSignin', {
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
            dispatch('account/showAlertSignin', {
              type: 'info',
              message: response.message,
            });
            Router.push({ path: '/signin' });
          });
      }
    });
  },

  // newPassword({ dispatch }, password) {
  //   // ...
  // },

  // resetPassword({ dispatch }, email) {
  //   // ...
  // },

  signIn({ commit, dispatch }, user) {
    return new Promise((resolve, reject) => {
      Http.send('POST', '/signin', user)
        .then((response) => {
          commit('SET_MY_ID', response.id, { root: true });
          localStorage.setItem('session-token', response.token);
          Router.push({ path: `/${response.id}` });
        })
        .catch((error) => {
          dispatch('showAlertSignin', {
            type: 'error',
            message: error.message,
          });
          reject(error);
        });
    });
  },

  signOut({ commit, dispatch }) {
    Http.send('DELETE', '/signout')
      .then((response) => {
        commit('DEL_MY_ID', undefined, { root: true });
        localStorage.removeItem('session-token');
        dispatch('showAlertSignin', {
          type: 'info',
          message: response.message,
        });
        Router.push({ path: '/signin' });
      })
      .catch((error) => {
        dispatch('account/showAlertSignin', {
          type: 'error',
          message: error.message,
        });
      });
  },
};

const mutations = {

  SET_ALERT(state, alert) {
    state.alertSignin = alert;
  },

};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
