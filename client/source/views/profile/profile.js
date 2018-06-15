// Services
import * as SessionService from '@/services/session';

// Components
import BaseButton from '@/components/BaseButton/BaseButton.vue';

export default {

  components: {
    'z-button': BaseButton,
  },

  computed: {
    userId() {
      return this.$store.state.user.user.id;
    },
  },

  methods: {
    signOut() {
      SessionService.signOut();
      this.$router.push({ path: '/signin' });
    },
  },
};
