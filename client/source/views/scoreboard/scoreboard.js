import { mapActions } from 'vuex';

export default {

  data() {
    return {
      users: [],
    };
  },

  computed: {
    myUserId() {
      return this.$store.state.user.id;
    },
  },

  methods: {
    ...mapActions({
      loadScoreboard: 'user/loadScoreboard',
    }),

    pathAvatar(avatar) {
      return require(`@/assets/avatars/${avatar}.png`);
    },
  },

  created() {
    this.loadScoreboard()
      .then((response) => {
        this.users = response.users;
      });
  },
};
