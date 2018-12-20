import { mapGetters } from 'vuex';

export default {

  name: 'z-user-avatar',

  props: {
    avatar: {
      type: String,
      default: 'null',
    },
    nickname: {
      type: String,
      default: 'null',
    },
  },

  data: () => ({
    isShowParametrs: false,
  }),

  computed: {
    ...mapGetters([
      'pathAvatar',
    ]),
    ...mapGetters({
      parameters: 'statics/getUserParameters',
    }),
  },

  methods: {
    showParametrs() {
      this.isShowParametrs = !this.isShowParametrs;
    },
  },

};
