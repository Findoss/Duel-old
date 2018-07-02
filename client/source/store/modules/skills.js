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
      limitCopy: 0,
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
          commit('SET_SKILLS', skills);
        })
        .catch(() => {

        });
    });
  },

  pressSkill({ commit }, id) {
    commit('SET_INFO_SKILL_ID', id);
  },
};

const mutations = {

  SET_SKILLS(state, skills) {
    state.skills = skills;
  },

  SET_INFO_SKILL_ID(state, id) {
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
