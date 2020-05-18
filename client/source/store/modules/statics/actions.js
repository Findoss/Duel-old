import Http from '@/utils/http';

export default {
  loadUserAttributes({ commit }) {
    return Http.get('/static/user-attributes')
      .then((response) => {
        commit('SET_USER_ATTRIBUTES', response);
      });
  },

  loadAvatarsList({ commit }) {
    return Http.get('/static/avatars')
      .then((response) => {
        commit('SET_AVATARS', response);
      });
  },
};