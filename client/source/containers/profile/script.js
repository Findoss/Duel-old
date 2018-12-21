import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'z-container-profile',


  computed: {
    ...mapGetters(['isLogin']),
  },


  methods: {
    ...mapActions({
      getUserParameters: 'statics/loadUserParameters',
      getMe: 'me/loadMe',
    }),

  },

  created() {
    this.getMe();
    this.getUserParameters();
  },
};