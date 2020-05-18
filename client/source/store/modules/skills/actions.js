import Http from '@/utils/http';

export default {
  loadSkills({ commit }) {
    return Http.get('/skills')
      .then((skills) => {
        commit('SET_SKILLS', skills);
      });
  },
};