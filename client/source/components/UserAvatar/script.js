import { mapGetters } from 'vuex';

export default {

  name: 'z-user-avatar',

  data: () => ({
    isShowParametrs: false,
  }),

  computed: {
    ...mapGetters([
      'pathAvatar',
    ]),
    ...mapGetters({
      user: 'me/getAllData',
      parameters: 'statics/getUserParameters',
    }),
  },

  methods: {
    showParametrs() {
      this.isShowParametrs = !this.isShowParametrs;
    },
  },

};
