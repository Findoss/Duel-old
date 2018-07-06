import { mapActions, mapState, mapGetters } from 'vuex';

// Components
import SkillCard from '@/components/SkillCard/SkillCard.vue';

export default {

  components: {
    'z-skill-card': SkillCard,
  },

  data() {
    return {
      pickSlill: 1,
    };
  },

  computed: {
    ...mapState({
      skillSet: state => state.user.skillSet,
      skillsUnlocked: state => state.user.skillsUnlocked,
      skills: state => state.skills.skills,
    }),
    ...mapGetters({
      getSkillInfo: 'skills/getSkillInfo',
      getSkillsSet: 'user/getSkillsSet',
      getCountSkillsClones: 'user/getCountSkillsClones',
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
      delInSkillSet: 'user/delInSkillSet',
      addInSkillSet: 'user/addInSkillSet',
      buySkill: 'user/buySkill',
    }),

    pressSkill(id) {
      this.pickSlill = id;
    },
  },
};
