/* eslint no-param-reassign: 0 */
/* eslint no-shadow: 0 */

import Http from '@/utils/http';
import Router from '@/router';

const state = {
  experience: 0, // опыт
  email: 'email', // почта
  skillsUnlocked: [], // разблокированые умения (доступные для добавления в набор)
  points: 0, // очки (очки умений)
  gold: 0, // золото
};

const getters = {
  isSkillUnlocked: state => id => state.skillsUnlocked.indexOf(id) !== -1,

  estate: state => ({
    points: state.points,
    gold: state.gold,
  }),
};

const actions = {
  loadMe({ commit, dispatch }) {
    return new Promise((resolve) => {
      Http.get('/me')
        .then((response) => {
          commit('SET_MY_ID', response.id, { root: true });
          commit('SET_USER_DATA', response);
          commit('SET_USER_PRIVATE_DATA', response);
          resolve(response);
        })
        .catch((error) => {
          dispatch('account/showAlertSignin', {
            type: 'error',
            message: error.message,
          });
          Router.push({ path: '/signin' });
        });
    });
  },

  delInSkillSet({ commit }, id) {
    const { points } = this.getters['skills/getSkillInfo'](id);
    return new Promise(() => {
      Http.send('DELETE', '/me/skillset', { id })
        .then(() => {
          commit('DEL_SKILL_IN_SET', id);
          commit('RESET_POINTS', points);
        });
    });
  },

  addInSkillSet({ commit }, id) {
    const { points } = this.getters['skills/getSkillInfo'](id);
    return new Promise(() => {
      Http.send('POST', '/me/skillset', { id })
        .then(() => {
          commit('ADD_SKILL_IN_SET', id);
          commit('EXPENSES_POINTS', points);
        });
    });
  },

  buySkill({ commit }, id) {
    const { priceInGold } = this.getters['skills/getSkillInfo'](id);
    return new Promise(() => {
      Http.send('POST', '/me/buyskill', { id })
        .then(() => {
          commit('UNLOCK_SKILL', id);
          commit('EXPENSES_GOLD', priceInGold);
        });
    });
  },

  // Использовать для данных не хранящихся в сторе
  // FIXME HUCK !!!!
  // eslint-disable-next-line
  updateAccountDataNoStore ({ }, payload) {
    return new Promise((resolve, reject) => {
      const { field } = payload;
      const { data } = payload;
      Http.send('PATCH', `/me/${field}`, data)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

};

const mutations = {

  SET_USER_PRIVATE_DATA(state, userData) {
    state.email = userData.email;
    state.gold = userData.gold;
    state.experience = userData.experience;
    state.points = userData.points;
    state.skillsUnlocked = userData.skillsUnlocked;
  },

  UNLOCK_SKILL(state, id) {
    state.skillsUnlocked.push(id);
  },

  EXPENSES_GOLD(state, number) {
    state.gold -= number;
  },

  EXPENSES_POINTS(state, number) {
    state.points -= number;
  },

  RESET_POINTS(state, number) {
    state.points += number;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
