import { mapState } from 'vuex';

export default {

  name: 'z-user-nickname',

  computed: {
    ...mapState({
      nickname: state => state.user.nickname,
      level: state => state.user.level,
    }),
  },
};
