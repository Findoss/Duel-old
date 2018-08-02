import Http from '@/utils/http';

const state = {
  parameters: {
    armor: 0, // броня
    block: 0, // блок
    force: 0, // сила
    health: 0, // здоровье
    healing: 0, // лечение
    luck: 0, // удача
    rage: 0, // ярость
    resources: { // ресурсы (для использования умений)
      energy_1: 0, // энергия_1
      energy_2: 0, // энергия_2
      energy_3: 0, // энергия_3
    },
  },
  avatars: [], // доступные аватары
};

const getters = {
  getUserParameters: state => state.parameters,
  getAvatarList: state => state.avatars,
};

const actions = {
  loadUserParameters({ commit }) {
    Http.get('/static/user-parameters')
      .then((response) => {
        commit('SET_USER_PARAMETERS', response);
      });
  },

  loadAvatarsList({ commit }) {
    return new Promise((resolve, reject) => {
      Http.get('/static/avatars')
        .then((response) => {
          commit('SET_AVATARS', response.avatars);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

const mutations = {
  SET_USER_PARAMETERS(state, parameters) {
    state.parameters = parameters;
  },
  SET_AVATARS(state, avatars) {
    state.avatars = avatars;
  },
};


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
