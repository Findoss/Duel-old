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
        this.setData(user);
      })
      .catch((error) => {
        console.warn(error);
        this.$router.push({ path: '/' });
      });
  },

  methods: {
    signOut() {
      localStorage.setItem('session-token', null);
      this.$router.push({ path: '/' });
    },
    setData(user) {
      this.user = user;
      this.user.avatar = imgAvatar;
    },
  },
};
