/* eslint no-param-reassign: 0 */

export default {
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