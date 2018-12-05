import Http from '@/utils/http';
import Router from '@/routes';
import socket, { socketAuth } from '@/utils/socket';

export default {
  registration({ dispatch }, user) {
    return Http.send('POST', '/users', user)
      .then((response) => {
        dispatch('showAlertSignin', {
          type: 'success',
          message: response.message,
        });
        Router.push({ name: 'root' });
      });
  },


  deleteAccount({ dispatch }) {
    if (confirm('Once you delete your account, there is no going back. Please be certain.')) {
      return Http.send('DELETE', '/me')
        .then((response) => {
          localStorage.removeItem('session-token');
          dispatch('showAlertSignin', {
            type: 'info',
            message: response.message,
          });
          Router.push({ name: 'root' });
        });
    }
    return Promise.reject();
  },


  // TODO реализовать методы API
  // passwordNew({ dispatch }, password) {
  //   // ...
  // },

  // TODO реализовать методы API
  passwordReset({ dispatch }, email) {
    return Http.send('POST', '/auth/password-reset', email);
  },

  signIn({ commit }, user) {
    return Http.send('POST', '/auth/signin', user)
      .then((response) => {
        // сохраняем в стор
        commit('SET_MY_ID', response.id, { root: true });
        // сохраняем в localStorage
        localStorage.setItem('session-token', response.token);
        // запускаем сокеты
        // socketAuth();

        Router.push({ path: `/${response.id}` });
      });
  },

  signOut({ commit, dispatch }) {
    return Http.send('DELETE', '/auth/signout')
      .then((response) => {
        dispatch('showAlertSignin', {
          type: 'info',
          message: response.message,
        });
      })
      .finally(() => {
        commit('DEL_MY_ID', undefined, { root: true });
        localStorage.removeItem('session-token');
        socket.disconnect();
        Router.push({ path: '/signin' });
      });
  },
};
