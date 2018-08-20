/* eslint no-param-reassign: 0 */
/* eslint no-shadow: 0 */

// import Http from '@/utils/http';
// import Router from '@/router';

const state = {
  board: [
    [4, 4, 1, 2, 3, 3],
    [4, 2, 5, 3, 2, 4],
    [1, 5, 2, 4, 5, 1],
    [2, 3, 1, 3, 1, 2],
    [5, 1, 2, 5, 4, 4],
    [2, 3, 4, 2, 3, 5],
  ],
  turn: 0,
  turnTimer: 30,
};

const getters = {
  getBoard: state => state.board,

  // estate: state => ({
  //   points: state.points,
  //   gold: state.gold,
  // }),
};

const actions = {
  // loadMe({ commit, dispatch }) {
  //   return new Promise((resolve, reject) => {
  //     Http.get('/me')
  //       .then((response) => {
  //         commit('SET_MY_ID', response.id, { root: true });
  //         commit('SET_USER_DATA', response);
  //         commit('SET_USER_PRIVATE_DATA', response);
  //         resolve(response);
  //       })
  //       .catch((error) => {
  //         dispatch('account/showAlertSignin', {
  //           type: 'error',
  //           message: error.message,
  //         });
  //         Router.push({ path: '/signin' });
  //       });
  //   });
  // },

};

const mutations = {

  // SET_USER_PRIVATE_DATA(state, userData) {
  //   state.email = userData.email;
  //   state.gold = userData.gold;
  //   state.experience = userData.experience;
  //   state.points = userData.points;
  //   state.skillsUnlocked = userData.skillsUnlocked;
  // },

  // UNLOCK_SKILL(state, id) {
  //   state.skillsUnlocked.push(id);
  // },

  // EXPENSES_GOLD(state, number) {
  //   state.gold -= number;
  // },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
