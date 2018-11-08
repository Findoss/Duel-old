import { mapActions } from 'vuex';

export default {
  name: 'z-header-menu',

  computed: {
    myId() {
      return this.$store.getters.myId;
    },
  },

  created() {
    this.loadMe();
    this.loadUserParameters();
    this.loadSkills();
  },

  methods: {
    ...mapActions({
      loadMe: 'me/loadMe',
      loadSkills: 'skills/loadSkills',
      loadUserParameters: 'statics/loadUserParameters',

      signOut: 'me/account/signOut',
    }),
  },
};
