import MeService from '@/services/me-service';
import SessionService from '@/services/session-service';

// Components
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import BaseLoading from '@/components/BaseLoading/BaseLoading.vue';

import imgAvatar from '@/assets/avatars/avatar.png';

export default {

  components: {
    'z-button': BaseButton,
    'z-loading': BaseLoading,
  },

  data() {
    return {
      loading: false,
      user: {
        nickname: null,
        email: null,
        avatar: null,
        rank: null,
      },
    };
  },

  created() {
    MeService.getMe()
      .then((user) => {
        this.user = user;
        this.user.avatar = imgAvatar;
        this.loading = true;
      })
      .catch((error) => {
        console.warn(error);
        SessionService.signOut();
        this.$router.push({ path: '/' });
      });
  },

  methods: {
    signOut() {
      SessionService.signOut();
      this.$router.push({ path: '/' });
    },
  },
};
