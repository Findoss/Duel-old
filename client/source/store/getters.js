/* eslint global-require: 0 */
/* eslint import/no-dynamic-require: 0 */

export default {
  myId: state => state.myId,
  //
  pathAvatar: () => avatar => require(`@/assets/avatars/${avatar}.png`),
  pathSkill: (state, getters) => (id) => {
    const { icon } = getters['skills/getSkillInfo'](id);
    return require(`@/assets/skills/${icon}.png`);
  },
  pathRune: () => id => require(`@/assets/runes/${id}.png`),
  //
  isLogin: state => Boolean(state.token),
  //
  notifications: state => state.notifications,
};