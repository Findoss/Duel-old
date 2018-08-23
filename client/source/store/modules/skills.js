/* eslint no-param-reassign: 0 */
/* eslint no-shadow: 0 */

import Http from '@/utils/http';

const state = {
  skills: {
    1: {
      changeTurn: false, // смена хода
      cooldown: 0, // время перезарядки
      description: 'null', // описание
      author: 'null', // автор умения
      duration: 0, // длительность действия
      id: 0, // номер
      limitCopy: 0, // максимальное количество повторений в наборе умний
      minLevel: 0, // минимальный уровень необходимый для покупки
      priceInGold: 0, // цена в золоте
      points: 0, // очки (стоимость добавления в набор)
      title: 'null', // заголовок
      triggeringEvent: 'null', // событие срабатывания
      resources: { // необходимые ресурсы для использования
        energy_1: 0, // энергия_1
        energy_2: 0, // энергия_2
        energy_3: 0, // энергия_3
      },
      modifiers: { // модификаторы
      },
    },
  },
};

const getters = {
  getSkillInfo: state => id => state.skills[id],
};

const actions = {
  loadSkills({ commit }) {
    return new Promise(() => {
      Http.get('/skills')
        .then((skills) => {
          commit('SET_SKILLS', skills);
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
