import MeService from '@/services/me-service';
import imgAvatar from '@/assets/avatars/avatar.png';

export default {

  data() {
    return {
      user: {
        nickname: '----',
        email: '----@----.--',
        avatar: '',
        rank: '',
      },
    };
  },

  created() {
    MeService.getMe()
      .then((user) => {
        this.user = user;
        this.user.avatar = imgAvatar;
      })
      .catch((error) => {
        console.warn(error);
        this.$router.push({ path: '/' });
      });
  },

  methods: {
    signOut() {
      localStorage.removeItem('session-token');
      this.$router.push({ path: '/' });
    },
  },
};
