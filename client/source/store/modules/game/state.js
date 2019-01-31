import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
  // board: [
  //   [4, 4, 1, 2, 3, 3],
  //   [4, 2, 5, 3, 2, 4],
  //   [1, 5, 2, 4, 5, 1],
  //   [2, 3, 1, 3, 1, 2],
  //   [5, 1, 2, 5, 4, 4],
  //   [2, 3, 4, 2, 3, 5],
  // ],
  board: [[]],
  turn: 0,
  turnTimer: 30,
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};