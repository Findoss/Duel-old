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

  passwordNew({ dispatch }, payload) {
    return Http.send('POST', '/auth/password-new', payload)
      .then((response) => {
        dispatch('addNotification', { type: 'success', message: response.message }, { root: true });
        Router.push({ name: 'root' });
      });
  },

  passwordReset({ }, email) {
    return Http.send('POST', '/auth/password-reset', email);
  },

  checkLink({ }, link) {
    return Http.get('/tools/checkPasswordResetLink', link)
      .catch(() => {
        Router.push({ name: 'passwordReset' });
      });
  },

  signIn({ commit, dispatch }, user) {
    return Http.send('POST', '/auth/signin', user)
      .then((response) => {
        const { id, token, message } = response;
        commit('SET_MY_ID', id, { root: true });
        commit('SET_MY_TOKEN', token, { root: true });

        dispatch('addNotification', { type: 'success', message }, { root: true });

        socketAuth();

        Router.push({ path: `/${response.id}` });
      });
  },

  signOut({ commit, dispatch }) {
    Http.send('DELETE', '/auth/signout')
      .finally(() => {
        commit('DEL_MY_ID', undefined, { root: true });
        commit('DEL_MY_TOKEN', undefined, { root: true });

        socket.disconnect();

        dispatch('addNotification', { type: 'info', message: 'web-socket disconnect' }, { root: true });

        Router.push({ name: 'root' });
      });
  },
};
