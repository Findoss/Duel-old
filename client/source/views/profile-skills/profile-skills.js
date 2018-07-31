import { mapActions, mapState, mapGetters } from 'vuex';

// Components
import UserParametrs from '@/components/UserParametrs/UserParametrs.vue';
import UserNickname from '@/components/UserNickname/UserNickname.vue';
import UserEstate from '@/components/UserEstate/UserEstate.vue';
import SkillCard from '@/components/SkillCard/SkillCard.vue';
import SkillGrid from '@/components/SkillGrid/SkillGrid.vue';
import SkillSet from '@/components/SkillSet/SkillSet.vue';
import Skill from '@/components/Skill/Skill.vue';

export default {

  components: {
    'z-user-parametrs': UserParametrs,
    'z-user-nickname': UserNickname,
    'z-user-estate': UserEstate,
    'z-skill-card': SkillCard,
    'z-skill-grid': SkillGrid,
    'z-skill-set': SkillSet,
    'z-skill': Skill,
  },

  data() {
    return {
      skillId: 1,
    };
  },

  computed: {
    ...mapState({
      skillSet: state => state.user.skillSet,
      skillsUnlocked: state => state.user.skillsUnlocked,
      skills: state => state.skills.skills,
      avatar: state => state.user.avatar,
    }),
    ...mapGetters({
      getSkillInfo: 'skills/getSkillInfo',
      skillSet: 'user/getSkillSet',
      getCountSkillsClones: 'user/getCountSkillsClones',
    }),
    ...mapGetters([
      'pathAvatarIcon',
      'pathSkill',
    ]),
  },

  methods: {
    ...mapActions({
      delInSkillSet: 'user/delInSkillSet',
      addInSkillSet: 'user/addInSkillSet',
      buySkill: 'user/buySkill',
    }),

    pressSkill(id) {
      this.skillId = id;
    },
  },
};
