import { mapState, mapGetters } from 'vuex';

import UserParametrs from '@/components/UserParametrs/UserParametrs.vue';
import SkillSet from '@/components/SkillSet/SkillSet.vue';
import Skill from '@/components/Skill/Skill.vue';

export default {

  components: {
    'z-user-parametrs': UserParametrs,
    'z-skill-set': SkillSet,
    'z-skill': Skill,
  },

  computed: {
    ...mapState({
      userParameters: state => state.user.parameters,
    }),
    ...mapGetters([
      'pathAvatar',
    ]),
    ...mapGetters({
      user: 'user/getAllData',
      skillSet: 'user/getSkillSet',
    }),
  },
};
