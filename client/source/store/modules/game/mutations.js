/* eslint no-param-reassign: 0 */

export default {
  START_GAME: (state, payload) => {
    state.board = payload.newBoard;
    state.stepUser = payload.step;
  },
};