import { mapActions, mapState, mapGetters } from 'vuex';

// Components
import HeaderMenu from '@/components/HeaderMenu/HeaderMenu.vue';
import Skill from '@/components/Skill/Skill.vue';
import SkillCard from '@/components/SkillCard/SkillCard.vue';
import SkillGrid from '@/components/SkillGrid/SkillGrid.vue';
import SkillSet from '@/components/SkillSet/SkillSet.vue';
import UserEstate from '@/components/UserEstate/UserEstate.vue';
import UserNickname from '@/components/UserNickname/UserNickname.vue';
import UserParametrs from '@/components/UserParametrs/UserParametrs.vue';

export default {

  components: {
    'z-header-menu': HeaderMenu,
    'z-skill-card': SkillCard,
    'z-skill-grid': SkillGrid,
    'z-skill-set': SkillSet,
    'z-skill': Skill,
    'z-user-estate': UserEstate,
    'z-user-nickname': UserNickname,
    'z-user-parametrs': UserParametrs,
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
      estate: 'me/estate',
      getCountSkillsClones: 'me/getCountSkillsClones',
      isSkillUnlocked: 'me/isSkillUnlocked',
      skillSet: 'me/getSkillSet',
      user: 'me/getAllData',

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
