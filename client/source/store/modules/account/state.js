import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
  alertSignin: { // оповещение при входе
    type: 'error', // тип оповещения
    message: '', // сообщение оповещения
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
