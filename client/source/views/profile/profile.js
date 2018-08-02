import { mapActions } from 'vuex';

export default {
  created() {
    this.loadMe();
    this.loadUserParameters();
    this.loadSkills();
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
      loadSkills: 'skills/loadSkills',
      loadMe: 'me/loadMe',
      signOut: 'me/account/signOut',
      loadUserParameters: 'statics/loadUserParameters',
    }),
  },
};
