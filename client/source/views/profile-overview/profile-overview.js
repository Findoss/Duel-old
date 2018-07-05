import { mapState, mapGetters } from 'vuex';

export default {
  computed: mapState({
    user: state => state.user,
    ...mapGetters([
      'pathAvatar',
      'pathSkill',
    ]),
  }),
};
