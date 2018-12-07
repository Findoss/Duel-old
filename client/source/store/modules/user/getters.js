export default {

  getAllData: state => state,

  getSkillSet: (state) => {
    const skillsSet = [];
    for (let i = 0; i < state.limitSlots; i += 1) {
      if (state.skillSet[i] !== undefined) {
        skillsSet.push(state.skillSet[i]);
      } else if (i >= state.openSlots) {
        skillsSet.push('lock'); // lock
      } else {
        skillsSet.push(''); // empty
      }
    }
    return skillsSet;
  },

  getCountSkillsClones: state => (id) => {
    let countClone = 0;
    state.skillSet.forEach((skill) => {
      if (skill === id) countClone += 1;
    });
    return countClone;
  },
};