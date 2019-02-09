/* eslint no-param-reassign: 0 */

export default {
  START_GAME: (state, payload) => {
    state.board = payload.board;
    state.stepUser = payload.step;
  },
};