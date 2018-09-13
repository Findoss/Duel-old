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
      skillId: '0',
    };
  },

  computed: {
    ...mapState({
      skills: state => state.skills.skills,
    }),
    ...mapGetters({
      getCountSkillsClones: 'me/getCountSkillsClones',
      isSkillUnlocked: 'me/isSkillUnlocked',
      skillSet: 'me/getSkillSet',
      user: 'me/getAllData',
      estate: 'me/estate',

      getSkillInfo: 'skills/getSkillInfo',

      parameters: 'statics/getUserParameters',
    }),
    ...mapGetters([
      'pathAvatarIcon',
      'pathSkill',
    ]),
  },

  methods: {
    ...mapActions({
      delInSkillSet: 'me/delInSkillSet',
      addInSkillSet: 'me/addInSkillSet',
      buySkill: 'me/buySkill',
    }),

    pressSkill(id) {
      this.skillId = id;
    },
  },
};
