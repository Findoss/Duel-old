import { mapActions, mapState, mapGetters } from 'vuex';

export default {

  name: 'z-skill-card',

  props: {
    skill: {
      type: Object,
      default() {
        return { id: 0 };
      },
    },
  },

  computed: {
    ...mapState({
      skillSet: state => state.user.skillSet,
      skillsUnlocked: state => state.user.skillsUnlocked,
      skills: state => state.skills.skills,
    }),
    ...mapGetters({
      getSkillSet: 'user/getSkillSet',
      getCountSkillsClones: 'user/getCountSkillsClones',
    }),
    ...mapGetters([
      'pathSkill',
    ]),
  },


  methods: {
    ...mapActions({
      loadSkills: 'skills/loadSkills',
      buySkill: 'user/buySkill',
      delInSkillSet: 'user/delInSkillSet',
      addInSkillSet: 'user/addInSkillSet',
    }),

    pressSkill(id) {
      this.pickSlill = id;
    },
  },

};
