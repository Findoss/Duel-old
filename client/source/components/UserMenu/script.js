export default {

  name: 'z-user-menu',

  props: {
    estate: {
      type: Object,
      default: () => ({
        gold: 9999,
        diamond: 9999,
      }),
    },
    nickname: {
      type: String,
      default: 'САМЫЙ_ДЛИННЫЙ_НИКНЕЙМ',
    },
    level: {
      type: Number,
      default: 999,
    },
  },
};
