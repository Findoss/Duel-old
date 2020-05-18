import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'z-container-profile',


  computed: {
    ...mapGetters(['isLogin']),
  },


  methods: {
    ...mapActions({
      getUserAttributes: 'statics/loadUserAttributes',
      getMe: 'me/loadMe',
    }),

  },

  created() {
    this.getMe();
    this.getUserAttributes();
  },
};