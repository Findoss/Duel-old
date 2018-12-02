export default {
  getSkillInfo: state => (id) => {
    const result = state.skills.find(skill => skill.id === id);
    if (result !== undefined) return result;
    return state.skills[0];
  },
};