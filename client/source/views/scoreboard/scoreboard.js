import { mapActions, mapGetters } from 'vuex';

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
    ...mapGetters([
      'pathAvatar',
    ]),
  },

  methods: {
    ...mapActions({
      loadScoreboard: 'user/loadScoreboard',
    }),
  },

  created() {
    this.loadScoreboard()
      .then((response) => {
        this.users = response.users;
      });
  },
};
