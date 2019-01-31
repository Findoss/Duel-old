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
      default: '',
    },
  },

  data: () => ({
    isShowAttributes: false,
  }),

  computed: {
    ...mapGetters([
      'pathAvatar',
    ]),
    ...mapGetters({
      attributes: 'statics/getUserAttributes',
    }),
  },

  methods: {
    showAttributes() {
      this.isShowAttributes = !this.isShowAttributes;
    },
  },

};
