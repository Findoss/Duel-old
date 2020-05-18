export default {
  stepUser: state => state.stepUser,
  currentStepTime: state => state.currentStepTime / 1000,
  isMyStep: (state, getters, rootState) => state.stepUser === rootState.myId,
  // isMyStep: () => false,
};