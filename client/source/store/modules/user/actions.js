import Http from '@/utils/http';

export default {
  loadScoreboard() {
    return Http.get('/users');
  },

  loadUser({ commit }, id) {
    return Http.get(`/users/${id}`)
      .then((response) => {
        commit('SET_USER_DATA', response);
      });
  },
};