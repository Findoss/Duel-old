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
    userId() {
      return this.$store.state.user.id;
    },
  },

  methods: {
    ...mapActions({
      loadMe: 'user/loadMe',
      loadUserParameters: 'user/loadUserParameters',
      loadSkills: 'skills/loadSkills',
      signOut: 'user/signOut',
    }),
  },
};
