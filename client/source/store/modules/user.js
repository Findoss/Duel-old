/* eslint no-param-reassign: 0 */
/* eslint no-shadow: 0 */

import Http from '@/utils/http';

const state = () => ({
  avatar: 'null', // аватар
  id: 0, // номер
  karma: 1, // карма (уровень адкватности пользователя)
  level: 0, // уровень
  limitSlots: 8, // максимальное кол-во слотов в наборе
  nickname: 'null', // никнейм
  openSlots: 3, // открыто слотов в наборе
  rank: 0, // ранг (позиция в списке лидеров)
  skillSet: [], // набор умений
});

const getters = {
  getAllData: state => state,

  getSkillSet: (state) => {
    const skillsSet = [];
    for (let i = 0; i < state.limitSlots; i += 1) {
      if (state.skillSet[i] !== undefined) {
        skillsSet.push(state.skillSet[i]);
      } else if (i >= state.openSlots) {
        skillsSet.push(-2); // lock
      } else {
        skillsSet.push(-1); // empty
      }
    }
    return skillsSet;
  },

  getCountSkillsClones: state => (id) => {
    let countClone = 0;
    state.skillSet.forEach((skill) => {
      if (skill === id) countClone += 1;
    });
    return countClone;
  },

};

const actions = {

  // todo
  loadScoreboard() {
    return new Promise((resolve, reject) => {
      Http.get('/users')
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  loadUser({ commit }, id) {
    return new Promise((resolve, reject) => {
      Http.get(`/users/${id}`)
        .then((response) => {
          commit('SET_USER_DATA', response);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

const mutations = {

  SET_USER_DATA(state, userData) {
    state.id = userData.id;
    state.nickname = userData.nickname;
    state.avatar = userData.avatar;
    state.rank = userData.rank;
    state.level = userData.level;
    state.karma = userData.karma;
    state.openSlots = userData.openSlots;
    state.skillSet = userData.skillSet;
  },

  SET_AVATAR(state, avatar) {
    state.avatar = avatar;
  },

  SET_NICKNAME(state, nickname) {
    state.nickname = nickname;
  },

  DEL_SKILL_IN_SET(state, idSkill) {
    state.skillSet.splice(state.skillSet.indexOf(idSkill), 1);
  },

  ADD_SKILL_IN_SET(state, idSkill) {
    state.skillSet.push(idSkill);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
