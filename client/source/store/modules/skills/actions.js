import Http from '@/utils/http';

export default {
  loadSkills({ commit }) {
    return new Promise(() => {
      Http.get('/skills')
        .then((skills) => {
          commit('SET_SKILLS', skills);
        });
    });
  },
};