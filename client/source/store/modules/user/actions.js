import Http from '@/utils/http';

export default {
  loadScoreboard() {
    return new Promise((resolve, reject) => {
      Http.get('/users')
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  loadUser({ commit }, id) {
    return new Promise((resolve, reject) => {
      Http.get(`/users/${id}`)
        .then((response) => {
          commit('SET_USER_DATA', response);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};