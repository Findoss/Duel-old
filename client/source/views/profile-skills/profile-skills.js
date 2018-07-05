import { mapActions, mapState, mapGetters } from 'vuex';

// Components

export default {

  components: {
  },

  computed: {
    ...mapState({
      selectedSkills: state => state.user.selectedSkills,
      unlockedSkills: state => state.user.unlockedSkills,
      skills: state => state.skills.skills,
      infoSkillId: state => state.skills.infoSkillId,
    }),
    ...mapGetters({
      getSkillInfo: 'skills/getSkillInfo',
      getSkillsSet: 'user/getSkillsSet',
      getSkillsClones: 'user/getSkillsClones',
    }),
    ...mapGetters([
      'pathAvatar',
      'pathSkill',
    ]),
  },

  mounted() {
    // console.log();
  },

  methods: {
    ...mapActions({
      loadSkills: 'skills/loadSkills',
      pressSkill: 'skills/pressSkill',
      delSelectedSkill: 'user/delSelectedSkill',
      addSelectedSkill: 'user/addSelectedSkill',
      buySkill: 'user/buySkill',
    }),

    },
  },
};
