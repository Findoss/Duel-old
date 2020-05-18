/* eslint no-param-reassign: 0 */

export default {
  START_GAME: (state, payload) => {
    state.board = payload.newBoard;
    state.stepTime = payload.stepTime;
    state.stepUser = payload.step;
    state.currentStepTime = payload.currentStepTime;
  },

  SET_STEP_USER: (state, payload) => {
    state.stepUser = payload.currentStepUserId;
  },

  DEC_CURRENT_TIME_STEP: (state) => {
    state.currentStepTime -= 1000;
  },

  RESET_CURRENT_TIME_STEP: (state) => {
    state.currentStepTime = state.stepTime;
  },

  SET_ID_TIMER_STEP: (state, idStepTimer) => {
    state.idStepTimer = idStepTimer;
  },
};