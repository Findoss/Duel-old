import Http from '@/utils/http';
import Router from '@/routes';
import socket, { socketAuth } from '@/utils/socket';

export default {
  registration({ dispatch }, user) {
    return Http.send('POST', '/users', user)
      .then((response) => {
        dispatch('addNotification', { type: 'success', message: response.message }, { root: true });
        Router.push({ name: 'root' });
      });
  },


  deleteAccount({ }) {
    if (confirm('Once you delete your account, there is no going back. Please be certain.')) {
      return Http.send('DELETE', '/me')
        .then(() => {
          localStorage.removeItem('session-token');
          Router.push({ name: 'root' });
        });
    }
    return Promise.reject();
  },


  // TODO реализовать методы API
  passwordNew({ dispatch }, payload) {
    return Http.send('POST', '/auth/password-new', payload)
      .then((response) => {
        dispatch('addNotification', { type: 'success', message: response.message }, { root: true });
        Router.push({ name: 'root' });
      });
  },

  // TODO реализовать методы API
  passwordReset({ }, email) {
    return Http.send('POST', '/auth/password-reset', email);
  },

  // TODO реализовать методы API
  checkLink({ }, link) {
    return Http.get('/tools/checkPasswordResetLink', link)
      .catch(() => {
        // dispatch('addNotification', { type: 'error', message: error.message }, { root: true });
        Router.push({ name: 'passwordReset' });
      });
  },

  signIn({ commit, dispatch }, user) {
    return Http.send('POST', '/auth/signin', user)
      .then((response) => {
        const { id, token, message } = response;

        commit('SET_MY_ID', id, { root: true });
        dispatch('addNotification', { type: 'success', message }, { root: true });
        localStorage.setItem('myId', id);
        localStorage.setItem('session-token', token);

        // запускаем сокеты
        // socketAuth();

        Router.push({ path: `/${response.id}` });
      });
  },

  signOut({ commit }) {
    Http.send('DELETE', '/auth/signout')
      .finally(() => {
        commit('DEL_MY_ID', undefined, { root: true });
        localStorage.removeItem('myId');
        localStorage.removeItem('session-token');

        socket.disconnect();
        Router.push({ name: 'root' });
      });
  },
};
