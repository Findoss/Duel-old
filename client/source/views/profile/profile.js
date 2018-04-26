// Services
import * as MeService from '@/services/me';
import * as SessionService from '@/services/session';

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
