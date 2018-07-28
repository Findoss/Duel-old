const getters = {
  pathAvatar: state => avatar => require(`@/assets/avatars/${avatar}.png`),
  pathAvatarIcon: state => avatar => require(`@/assets/avatars/${avatar}_icon.png`),
  pathSkill: state => id => require(`@/assets/skills/${id}.png`),
};

export default getters;
