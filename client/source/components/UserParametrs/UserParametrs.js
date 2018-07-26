import { mapState } from 'vuex';

export default {

  name: 'z-user-parametrs',

  computed: {
    ...mapState({
      userParameters: state => state.user.parameters,
    }),
  },

};
