const getters = {
  pathAvatar: state => avatar => require(`@/assets/avatars/${avatar}.png`),
  pathSkill: state => id => require(`@/assets/skills/${id}.png`),
};

export default getters;
