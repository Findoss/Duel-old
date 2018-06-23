import Http from '@/utils/http';

const state = {
  skills: {
    0: {
      id: 0,
      title: '',
      description: '',
      duration: 0,
      cooldown: 0,
      changeCourse: false,
      triggeringEvent: '',
      energy_1: 0,
      energy_2: 0,
      energy_3: 0,
      skillPoints: 0,
      priceInGold: 0,
      minLevel: 0,
    },
  },
  infoSkillId: 0,
};

const getters = {
  getSkillInfo: state => state.skills[state.infoSkillId],
};

const actions = {
  loadSkills({ commit }) {
    return new Promise((resolve, reject) => {
      Http.get('/skills')
        .then((skills) => {
          commit('setSkills', skills);
        })
        .catch(() => {

        });
    });
  },

  pressSkill({ commit }, id) {
    commit('setInfoSkillId', id);
  },
};

const mutations = {

  setSkills(state, skills) {
    state.skills = skills;
  },

  setInfoSkillId(state, id) {
    state.infoSkillId = id;
  },

};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
