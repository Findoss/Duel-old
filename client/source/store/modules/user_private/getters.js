export default {
  isSkillUnlocked: state => id => state.skillsUnlocked.indexOf(id) !== -1,

  estate: state => ({
    points: state.points,
    gold: state.gold,
  }),
};