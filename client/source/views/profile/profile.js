// Services
import * as SessionService from '@/services/session';

// Components
import BaseButton from '@/components/BaseButton/BaseButton.vue';

export default {

  components: {
    'z-button': BaseButton,
  },

  created() {
    this.$store.dispatch('user/getMe');
  },

  computed: {
    userId() {
      return this.$store.state.user.id;
    },
  },

  methods: {
    signOut() {
      SessionService.signOut()
        .then((response) => {
          this.$store.commit('authorization/showAlert', {
            type: 'info',
            message: response.message,
          });
          this.$router.push({ path: '/signin' });
        })
        .catch((error) => {
          console.warn(error);
        });
    },
  },
};
