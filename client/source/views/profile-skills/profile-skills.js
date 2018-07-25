import { mapActions, mapState, mapGetters } from 'vuex';

// Components
import SkillCard from '@/components/SkillCard/SkillCard.vue';
import SkillSet from '@/components/SkillSet/SkillSet.vue';
import Skill from '@/components/Skill/Skill.vue';

export default {

  components: {
    'z-skill-card': SkillCard,
    'z-skill-set': SkillSet,
    'z-skill': Skill,
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
      level: state => state.user.level,
      nickname: state => state.user.nickname,
      points: state => state.user.points,
      gold: state => state.user.gold,
      avatar: state => state.user.avatar,
      userParameters: state => state.user.parameters,
    }),
    ...mapGetters({
      getSkillInfo: 'skills/getSkillInfo',
      skillSet: 'user/getSkillSet',
      getCountSkillsClones: 'user/getCountSkillsClones',
    }),
    ...mapGetters([
      'pathAvatar',
      'pathSkill',
    ]),
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
