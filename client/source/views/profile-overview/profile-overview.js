import { mapState } from 'vuex';

export default {
  computed: mapState({
    user: state => state.user,
  }),

  methods: {

    pathSkill(id) {
      return require(`@/assets/skills/${id}.png`);
    },

    pathAvatar(avatar) {
      return require(`@/assets/avatars/${avatar}.png`);
    },
  },
};
