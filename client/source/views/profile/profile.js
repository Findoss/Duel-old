// Services
// import * as MeService from '@/services/me';
import * as SessionService from '@/services/session';

// Components
import BaseButton from '@/components/BaseButton/BaseButton.vue';

export default {

  components: {
    'z-button': BaseButton,
  },

  data() {
    return {};
  },

  methods: {
    signOut() {
      SessionService.signOut();
      this.$router.push({ path: '/signin' });
    },
  },
};
