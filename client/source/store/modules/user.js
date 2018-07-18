import Http from '@/utils/http';
import Router from '@/router';

import account from './account';

const state = {
  avatar: 'null', // аватар
  experience: 0, // опыт
  gold: 0, // золото
  id: 0, // номер
  karma: 1, // карма (уровень адкватности пользователя)
  level: 0, // уровень
  limitSlots: 8, // максимальное кол-во слотов в наборе
  nickname: 'null', // никнейм
  openSlots: 3, // открыто слотов в наборе
  points: 0, // очки (очки умений)
  rank: 0, // ранг (позиция в списке лидеров)
  skillSet: [], // набор умений
  skillsUnlocked: [], // разблокированые умения (доступные для добавления в набор)
  parameters: { // параметры
    armor: 0, // броня
    block: 0, // блок
    force: 0, // сила
    health: 0, // здоровье
    healing: 0, // лечение
    luck: 0, // удача
    rage: 0, // ярость
    resources: { // ресурсы (для использования умений)
      energy_1: 0, // энергия_1
      energy_2: 0, // энергия_2
      energy_3: 0, // энергия_3
    },
  },
};

const getters = {
  getAllData: state => state,

  getSkillsSet: (state) => {
    const skillsSet = [];
    for (let i = 0; i < state.limitSlots; i++) {
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
  loadMe({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      Http.get('/me')
        .then((response) => {
          commit('SET_USER_DATA', response);
        })
        .catch((error) => {
          dispatch('account/showAlertSignin', {
            type: 'error',
            message: error.message,
          });
          Router.push({ path: '/signin' });
        });
    });
  },

  loadUserParameters({ commit }) {
    Http.get('/static/user-parameters')
      .then((response) => {
        commit('SET_USER_PARAMETERS', response);
      });
  },

  delInSkillSet({ commit }, id) {
    const { points } = this.getters['skills/getSkillInfo'](id);
    return new Promise((resolve, reject) => {
      Http.send('DELETE', '/me/skillsset', { skillsset: [id] })
        .then((response) => {
          commit('DEL_SKILL_IN_SET', id);
          commit('RESET_POINTS', points);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  },

  addInSkillSet({ commit }, id) {
    const { points } = this.getters['skills/getSkillInfo'](id);
    return new Promise((resolve, reject) => {
      Http.send('PATCH', '/me/skillsset', { skillsset: [id] })
        .then((response) => {
          commit('ADD_SKILL_IN_SET', id);
          commit('EXPENSES_POINTS', points);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  },

  buySkill({ state, commit }, id) {
    const { priceInGold } = this.getters['skills/getSkillInfo'](id);
    return new Promise((resolve, reject) => {
      Http.send('POST', '/me/buyskill', { id })
        .then((response) => {
          commit('UNLOCK_SKILL', id);
          commit('EXPENSES_GOLD', priceInGold);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  },

  loadAvatarsList(ctx) {
    return new Promise((resolve, reject) => {
      Http.get('/static/avatars')
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // Использовать для данных не хранящихся в сторе
  updateAccountDataNoStore(ctx, payload) {
    return new Promise((resolve, reject) => {
      const { field } = payload;
      const { data } = payload;
      Http.send('PATCH', `/me/${field}`, { field: data })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  loadScoreboard(ctx) {
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
};

const mutations = {
  SET_USER_DATA(state, userData) {
    state.id = userData.id;
    state.nickname = userData.nickname;
    state.email = userData.email;
    state.avatar = userData.avatar;
    state.rank = userData.rank;
    state.gold = userData.gold;
    state.level = userData.level;
    state.experience = userData.experience;
    state.karma = userData.karma;
    state.openSlots = userData.openSlots;
    state.points = userData.points;
    state.skillSet = userData.skillSet;
    state.skillsUnlocked = userData.skillsUnlocked;
  },

  SET_USER_PARAMETERS(state, parameters) {
    state.parameters = parameters;
  },

  SET_AVATAR(state, avatar) {
    state.avatar = avatar;
  },

  SET_NICKNAME(state, nickname) {
    state.nickname = nickname;
  },

  SET_AVATAR(state, avatar) {
    state.avatar = avatar;
  },

  DEL_SKILL_IN_SET(state, idSkill) {
    state.skillSet.splice(state.skillSet.indexOf(idSkill), 1);
  },

  ADD_SKILL_IN_SET(state, idSkill) {
    state.skillSet.push(idSkill);
  },

  UNLOCK_SKILL(state, idSkill) {
    state.skillsUnlocked.push(idSkill);
  },

  EXPENSES_GOLD(state, number) {
    state.gold -= number;
  },

  EXPENSES_POINTS(state, number) {
    state.points -= number;
  },

  RESET_POINTS(state, number) {
    state.points += number;
  },
};

const modules = {
  account,
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules,
};
