import { mapGetters, mapActions } from 'vuex';

import UserParametrs from '@/components/UserParametrs/UserParametrs.vue';
import UserNickname from '@/components/UserNickname/UserNickname.vue';
import SkillSet from '@/components/SkillSet/SkillSet.vue';
import Rune from '@/components/BoardRune/BoardRune.vue';
import Board from '@/components/Board/Board.vue';
import Skill from '@/components/Skill/Skill.vue';


export default {

  components: {
    'z-user-parametrs': UserParametrs,
    'z-user-nickname': UserNickname,
    'z-skill-set': SkillSet,
    'z-skill': Skill,
    'z-board': Board,
    'z-rune': Rune,
  },

  computed: {
    ...mapGetters([
      'pathAvatar',
    ]),
    ...mapGetters({
      parametrs: 'statics/getUserParameters',
      user: 'me/getAllData',
      userSkillSet: 'me/getSkillSet',
      opponent: 'opponent/getAllData',
      opponentSkillSet: 'opponent/getSkillSet',
      getBoard: 'game/getBoard',
    }),
  },

  created() {
    this.loadUser();
  },

  methods: {
    ...mapActions({
      loadUser: 'opponent/loadUser',
    }),
  },
};
