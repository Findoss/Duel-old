import Router from '@/routes';
import socket from '@/utils/socket';

export default {
  startGame({ rootState, commit, dispatch }, data) {
    commit('lobby/RESET_TIME', null, { root: true });
    commit('me/SET_GAME_ID', data.gameId, { root: true });
    commit('START_GAME', data);

    const opponent = data.users.find(user => user.id !== rootState.myId);
    commit('opponent/SET_USER_DATA', opponent, { root: true });

    Router.replace({ name: 'game', params: { gameId: data.gameId, force: true } });

    dispatch('startTimerStep');
  },


  stopTimerStep({ state, commit }) {
    if (state.idStepTimer) {
      console.log('good');

      clearInterval(state.idStepTimer);
      commit('SET_ID_TIMER_STEP', null);
    }
    return true;
  },

  startTimerStep({ state, commit }) {
    if (!state.idStepTimer) {
      const idStepTimer = setInterval(() => {
        if (state.currentStepTime > 0) commit('DEC_CURRENT_TIME_STEP');
      }, 1000);
      commit('SET_ID_TIMER_STEP', idStepTimer);
    }
    return true;
  },

  resetTimerStep({ commit, dispatch }) {
    commit('RESET_CURRENT_TIME_STEP');
    dispatch('stopTimerStep');
    dispatch('startTimerStep');
    return true;
  },

  endGame({ commit, dispatch }) {
    dispatch('stopTimerStep');
    commit('me/SET_GAME_ID', '', { root: true });
    Router.replace({ name: 'gameEnd', params: { force: true } });
  },

  nextStep({ commit, dispatch }, data) {
    dispatch('resetTimerStep');
    commit('SET_STEP_USER', data);
  },

  // *** *** ***
  // *** *** ***
  // *** *** ***

  restore({ }, gameId) {
    socket.emit('game', { route: 'restore', payload: gameId });
  },

  surrender({ commit }) {
    commit('me/SET_GAME_ID', null, { root: true });
    socket.emit('game', { route: 'surrender' });
  },

  fakeAction() {
    socket.emit('game', { route: 'fake-action' });
  },
};