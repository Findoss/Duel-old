import { mapActions } from 'vuex';

// Components
import BaseLoading from '@/components/BaseLoading/BaseLoading.vue';

export default {

  components: {
    'z-loading': BaseLoading,
  },

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
