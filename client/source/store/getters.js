/* eslint global-require: 0 */
/* eslint import/no-dynamic-require: 0 */

const getters = {
  myId: (state) => {
    if (state.myId === 0) return Number(localStorage.getItem('myId'));
    return state.myId;
  },
  pathAvatar: () => id => require(`@/assets/avatars/${id}.png`),
  pathAvatarIcon: () => id => require(`@/assets/avatars/${id}_icon.png`),
  pathSkill: () => id => require(`@/assets/skills/${id}.png`),
  pathRune: () => id => require(`@/assets/runes/${id}.png`),
};

export default getters;
