/* eslint no-param-reassign: 0 */
/* eslint no-shadow: 0 */

/* eslint no-alert: 0 */ // HUCK
/* eslint no-restricted-globals: 0 */ // HUCK

import Http from '@/utils/http';
import Router from '@/router';
import socket from '../socket';

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
    return new Promise((reject) => {
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
    return new Promise(() => {
      if (confirm('Once you delete your account, there is no going back. Please be certain.')) {
        Http.send('DELETE', '/me')
          .then((response) => {
            localStorage.removeItem('session-token');
            dispatch('showAlertSignin', {
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
    return new Promise((reject) => {
      Http.send('POST', '/auth/signin', user)
        .then((response) => {
          commit('SET_MY_ID', response.id, { root: true });
          localStorage.setItem('session-token', response.token);
          socket.connect();
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
    Http.send('DELETE', '/auth/signout')
      .then((response) => {
        dispatch('showAlertSignin', {
          type: 'info',
          message: response.message,
        });
      })
      .catch((error) => {
        dispatch('showAlertSignin', {
          type: 'error',
          message: error.message,
        });
      })
      .finally(() => {
        socket.disconnect();
        commit('DEL_MY_ID', undefined, { root: true });
        localStorage.removeItem('session-token');
        Router.push({ path: '/signin' });
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
