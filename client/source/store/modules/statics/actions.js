import Http from '@/utils/http';

export default {
  loadUserParameters({ commit }) {
    Http.get('/static/user-parameters')
      .then((response) => {
        commit('SET_USER_PARAMETERS', response);
      });
  },

  loadAvatarsList({ commit }) {
    return new Promise((resolve) => {
      Http.get('/static/avatars')
        .then((response) => {
          commit('SET_AVATARS', response);
          resolve(response);
        });
    });
  },
};