import Http from '@/utils/http';

const state = {
  skills: {
    0: {
      changeTurn: false,
      cooldown: 0,
      description: 'null',
      duration: 0,
      id: 0,
      limitCopy: 0,
      minLevel: 0,
      priceInGold: 0,
      points: 0,
      title: 'null',
      triggeringEvent: 'null',
      resources: {
        energy_1: 0,
        energy_2: 0,
        energy_3: 0,
      },
    },
  },
};

const getters = {
  getSkillInfo: state => id => state.skills[id],
};

const actions = {
  loadSkills({ commit }) {
    return new Promise((resolve, reject) => {
      Http.get('/skills')
        .then((skills) => {
          commit('SET_SKILLS', skills);
        })
        .catch(() => {

        });
    });
  },
};

const mutations = {
  SET_SKILLS(state, skills) {
    state.skills = skills;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
