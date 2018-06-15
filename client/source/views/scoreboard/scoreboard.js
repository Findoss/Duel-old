// Services
import * as UserService from '@/services/user';

// Components
import BaseLoading from '@/components/BaseLoading/BaseLoading.vue';

export default {

  components: {
    'z-loading': BaseLoading,
  },

  data() {
    return {
      loading: false,
      users: [],
    };
  },

  computed: {
    myUserId() {
      return this.$store.state.user.user.id;
    },
  },

  methods: {
    pathAvatar(avatar) {
      return require(`@/assets/avatars/${avatar}.png`);
    },
  },

  created() {
    UserService.getUsers()
      .then((response) => {
        this.users = response.users;
        this.loading = true;
      })
      .catch((error) => {
        console.warn(error);
      });
  },
};
