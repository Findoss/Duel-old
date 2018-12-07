/* eslint no-param-reassign: 0 */

export default {
  SET_USER_PRIVATE_DATA(state, userData) {
    state.email = userData.email;
    state.gold = userData.gold;
    state.experience = userData.experience;
    state.points = userData.points;
    state.skillsUnlocked = userData.skillsUnlocked;
  },

  UNLOCK_SKILL(state, id) {
    state.skillsUnlocked.push(id);
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