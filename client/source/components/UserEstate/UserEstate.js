import { mapState } from 'vuex';

export default {

  name: 'z-user-estate',

  computed: {
    ...mapState({
      gold: state => state.user.gold,
      points: state => state.user.points,
    }),
  },
};
