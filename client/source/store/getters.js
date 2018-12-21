/* eslint global-require: 0 */
/* eslint import/no-dynamic-require: 0 */

export default {
  myId: (state) => {
    if (state.myId === '') return localStorage.getItem('myId');
    return state.myId;
  },
  //
  pathAvatar: () => avatar => require(`@/assets/avatars/${avatar}.png`),
  pathSkill: (state, getters) => (id) => {
    const { icon } = getters['skills/getSkillInfo'](id);
    return require(`@/assets/skills/${icon}.png`);
  },
  pathRune: () => id => require(`@/assets/runes/${id}.png`),
  //
  getToken: () => localStorage.getItem('session-token'),
  isLogin: () => Boolean(localStorage.getItem('session-token')),
  //
  notifications: state => state.notifications,
};
