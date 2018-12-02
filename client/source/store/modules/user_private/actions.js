import Http from '@/utils/http';
import Router from '@/routes';

export default {
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