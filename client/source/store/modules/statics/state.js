import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
  attributes: {
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

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
