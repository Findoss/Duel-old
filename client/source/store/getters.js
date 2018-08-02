const getters = {
  pathAvatar: state => avatar => require(`@/assets/avatars/${avatar}.png`),
  pathAvatarIcon: state => avatar => require(`@/assets/avatars/${avatar}_icon.png`),
  pathSkill: state => id => require(`@/assets/skills/${id}.png`),
  myId: (state) => {
    if (state.myId === 0) return Number(localStorage.getItem('myId'));
    return state.myId;
  },
};

export default getters;
