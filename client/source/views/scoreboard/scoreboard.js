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

  // computed: {
  //   pathAvatar(avatar) {
  //     return require(`@/assets/avatars/${avatar}.png`);
  //   },
  // },

  methods: {
    pathAvatar(avatar) {
      return require(`@/assets/avatars/${avatar}.png`);
    },
  },

  created() {
    UserService.getAllUsers()
      .then((users) => {
        console.log(users);

        this.users = users.users;
        this.loading = true;
      })
      .catch((error) => {
        console.warn(error);
      });
  },
};
