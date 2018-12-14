export default {
  isSkillUnlocked: state => id => state.skillsUnlocked.indexOf(id) !== -1,
};