const getters = {
  myId: (state) => {
    if (state.myId === 0) return Number(localStorage.getItem('myId'));
    return state.myId;
  },
  pathAvatar: () => avatar => require(`@/assets/avatars/${avatar}.png`),
  pathAvatarIcon: () => avatar => require(`@/assets/avatars/${avatar}_icon.png`),
  pathSkill: () => id => require(`@/assets/skills/${id}.png`),
};

export default getters;
