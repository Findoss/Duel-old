/* eslint global-require: 0 */
/* eslint import/no-dynamic-require: 0 */

export default {
  myId: (state) => {
    if (state.myId === '0000') return localStorage.getItem('myId');
    return state.myId;
  },
  pathAvatar: () => avatar => require(`@/assets/avatars/${avatar}.png`),
  pathAvatarIcon: () => avatar => require(`@/assets/avatars/${avatar}_icon.png`),
  pathSkill: (state, getters) => (id) => {
    const { icon } = getters['skills/getSkillInfo'](id);
    return require(`@/assets/skills/${icon}.png`);
  },
  pathRune: () => id => require(`@/assets/runes/${id}.png`),
};
