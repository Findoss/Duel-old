import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'z-container-profile',


  computed: {
    ...mapGetters({
      isLogin: 'me/account/isLogin',
    }),
  },


  methods: {
    ...mapActions({
      getMe: 'me/loadMe',
      getUserParameters: 'statics/loadUserParameters',
    }),

  },

  created() {
    if (this.isLogin) this.getMe();
    this.getUserParameters();
  },
};