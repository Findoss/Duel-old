import { mapActions } from 'vuex';

export default {
  created() {
    this.loadMe();
    this.loadSkills();
    this.loadUserParameters();
    // ...
    // ...
    // ...
  },

  computed: {
    myId() {
      return this.$store.getters.myId;
    },
  },

  methods: {
    ...mapActions({
      loadMe: 'user/loadMe',
      loadUserParameters: 'user/loadUserParameters',
      loadSkills: 'skills/loadSkills',
      signOut: 'user/account/signOut',
    }),
  },
};
