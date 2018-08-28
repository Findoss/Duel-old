import { mapActions, mapGetters } from 'vuex';

export default {

  data() {
    return {
      users: [],
    };
  },

  computed: {
    ...mapGetters({
      myId: 'myId',
      pathAvatar: 'pathAvatar',
    }),
  },

  methods: {
    ...mapActions({
      loadScoreboard: 'me/loadScoreboard',
    }),
  },

  created() {
    this.loadScoreboard()
      .then((response) => {
        this.users = response;
      });
  },
};
