// Utils
import Rules from '@/utils/validation/rules';

// Services
import * as SessionService from '@/services/session';

// Components
import BaseAlert from '@/components/BaseAlert/BaseAlert.vue';
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import BaseTextField from '@/components/BaseTextField/BaseTextField.vue';

export default {

  components: {
    'z-alert': BaseAlert,
    'z-button': BaseButton,
    'z-text-field': BaseTextField,
  },

  computed: {
    alert() {
      return this.$store.state.authorization.alert;
    },
  },


  data() {
    return {
      form: {
        email: {
          value: '',
          status: false,
          rules: [
            Rules.email,
          ],
        },
        password: {
          value: '',
        },
      },
    };
  },

  methods: {
    submit() {
      if (!this.form.email.status) {
        this.$refs.email.validation();
        return false;
      }

      const user = {
        email: this.form.email.value,
        password: this.form.password.value,
      };

      SessionService.signIn(user).then((response) => {
        if (response.code === undefined) {
          this.$router.push({ path: '/profile' });
        } else {
          this.$refs.password.reset();
          this.$store.commit('authorization/showAlert', {
            type: 'error',
            message: response.message,
          });
        }
      });
      return true;
    },
    closeAlert() {
      this.$store.commit('authorization/showAlert', {
        type: 'error',
        message: null,
      });
    },
  },
};
