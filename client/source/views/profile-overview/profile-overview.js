import { mapGetters } from 'vuex';

import UserParametrs from '@/components/UserParametrs/UserParametrs.vue';
import UserNickname from '@/components/UserNickname/UserNickname.vue';
import UserEstate from '@/components/UserEstate/UserEstate.vue';
import SkillSet from '@/components/SkillSet/SkillSet.vue';
import Skill from '@/components/Skill/Skill.vue';

export default {

  components: {
    'z-user-parametrs': UserParametrs,
    'z-user-nickname': UserNickname,
    'z-user-estate': UserEstate,
    'z-skill-set': SkillSet,
    'z-skill': Skill,
  },

  computed: {
    ...mapGetters([
      'pathAvatar',
    ]),
    ...mapGetters({
      user: 'user/getAllData',
      skillSet: 'user/getSkillSet',
    }),
  },
};
