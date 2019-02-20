import Http from '@/utils/http';

export default {
  // loadMe({ commit }) {
  //   return Http.get('/me')
  //     .then((response) => {
  //       // commit('SET_MY_ID', response.id, { root: true });
  //       commit('SET_USER_DATA', response);
  //       commit('SET_USER_PRIVATE_DATA', response);
  //     });
  // },

  // delInSkillSet({ commit }, id) {
  //   const { points } = this.getters['skills/getSkillInfo'](id);

  //   return Http.send('DELETE', '/me/skillset', { id })
  //     .then(() => {
  //       commit('DEL_SKILL_IN_SET', id);
  //       commit('RESET_POINTS', points);
  //     });
  // },

  // addInSkillSet({ commit }, id) {
  //   const { points } = this.getters['skills/getSkillInfo'](id);

  //   return Http.send('POST', '/me/skillset', { id })
  //     .then(() => {
  //       commit('ADD_SKILL_IN_SET', id);
  //       commit('EXPENSES_POINTS', points);
  //     });
  // },

  // buySkill({ commit }, id) {
  //   const { priceInGold } = this.getters['skills/getSkillInfo'](id);

  //   return Http.send('POST', '/me/buyskill', { id })
  //     .then(() => {
  //       commit('UNLOCK_SKILL', id);
  //       commit('EXPENSES_GOLD', priceInGold);
  //     });
  // },

  // // Использовать для данных не хранящихся в сторе
  // // FIXME HUCK !!!!
  // // eslint-disable-next-line
  // updateAccountDataNoStore({ }, payload) {
  //   const { field } = payload;
  //   const { data } = payload;
  //   return Http.send('PATCH', `/me/${field}`, data);
  // },
};