import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
  experience: 0, // опыт
  email: 'email', // почта
  skillsUnlocked: [], // разблокированые умения (доступные для добавления в набор)
  points: 0, // очки (очки умений)
  gold: 0, // золото
  diamond: 0, // алмазы
};

export default {
  namespaced: false,
  state,
  getters,
  actions,
  mutations,
};
