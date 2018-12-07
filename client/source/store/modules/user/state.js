import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = () => ({
  id: '0000', // номер
  avatar: 'null', // аватар
  karma: 1, // карма (уровень адкватности пользователя)
  level: 0, // уровень
  limitSlots: 8, // максимальное кол-во слотов в наборе
  nickname: 'null', // никнейм
  openSlots: 3, // открыто слотов в наборе
  rank: 0, // ранг (позиция в списке лидеров)
  skillSet: [], // набор умений
});

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
