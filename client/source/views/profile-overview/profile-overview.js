import { mapGetters, mapActions } from 'vuex';

import UserParametrs from '@/components/UserParametrs/UserParametrs.vue';
import UserNickname from '@/components/UserNickname/UserNickname.vue';
import UserEstate from '@/components/UserEstate/UserEstate.vue';
import SkillSet from '@/components/SkillSet/SkillSet.vue';
import Skill from '@/components/Skill/Skill.vue';
import HeaderMenu from '@/components/HeaderMenu/HeaderMenu.vue';

export default {


  components: {
    'z-header-menu': HeaderMenu,
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
      myId: 'myId',
      estate: 'me/estate',
      parametrs: 'statics/getUserParameters',
    }),
    user() {
      return this.$store.getters[`${this.moduleStore}/getAllData`];
    },
    skillSet() {
      return this.$store.getters[`${this.moduleStore}/getSkillSet`];
    },
    routeUserId() {
      return this.$route.params.userId;
    },
    isMe() {
      return this.routeUserId === this.myId;
    },
    moduleStore() {
      if (this.isMe) return 'me';
      return 'opponent';
    },
  },

  created() {
    if (!this.isMe) this.loadOtherUser();
  },

  watch: {
    $route: 'loadOtherUser',
  },

  methods: {
    ...mapActions({
      loadUser: 'opponent/loadUser',
    }),
    loadOtherUser() {
      this.loadUser(this.routeUserId);
    },
  },
};
