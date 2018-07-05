import { mapState, mapGetters } from 'vuex';

export default {
  computed: mapState({
    ...mapGetters([
      'pathAvatar',
      'pathSkill',
    ]),
    ...mapGetters({
      user: 'user/getAllUserData',
    }),
  }),
};
