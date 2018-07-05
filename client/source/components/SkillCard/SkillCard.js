import { mapActions, mapState, mapGetters } from 'vuex';

export default {

  name: 'z-skill-card',

  // data: () => ({
  //   skill: {
  //     changeTurn: false,
  //     cooldown: 0,
  //     description: 'null',
  //     duration: 0,
  //     id: 0,
  //     limitCopy: 0,
  //     minLevel: 0,
  //     priceInGold: 0,
  //     points: 0,
  //     title: 'null',
  //     triggeringEvent: 'null',
  //     resources: {
  //       energy_1: 0,
  //       energy_2: 0,
  //       energy_3: 0,
  //     },
  //   },
  // }),

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
      getSkillsSet: 'user/getSkillsSet',
      getSkillsClones: 'user/getSkillsClones',
      // skill: 'skills/getSkillInfo',
    }),
    ...mapGetters([
      'pathSkill',
    ]),
  },


  methods: {
    ...mapActions({
      loadSkills: 'skills/loadSkills',
      buySkill: 'user/buySkill',
      delSelectedSkill: 'user/delSelectedSkill',
      addSelectedSkill: 'user/addSelectedSkill',
    }),

    pressSkill(id) {
      this.pickSlill = id;
    },
  },

};
