import { mapActions } from 'vuex';

export default {
  name: 'z-container-profile',

  methods: {
    ...mapActions({
      getMe: 'me/loadMe',
      getUserParameters: 'statics/loadUserParameters',
    }),
  },

  created() {
    this.getMe();
    this.getUserParameters();
  },
};