import { mapState, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapState({
      userParameters: state => state.user.parameters,
    }),
    ...mapGetters([
      'pathAvatar',
      'pathSkill',
    ]),
    ...mapGetters({
      user: 'user/getAllData',
    }),
  },
};
