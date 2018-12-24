/* eslint no-param-reassign: 0 */

export default {
  SET_TIME: (state, time) => {
    state.time = time;
  },
  RESET_TIME: (state) => {
    state.time = 10;
  },
};