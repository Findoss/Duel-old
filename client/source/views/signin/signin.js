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
    'z-text-field': BaseTextField,
    'z-button': BaseButton,
    'z-alert': BaseAlert,
  },

  // props: {
  //   alert: {
  //     type: Object,
  //     default: () => ({
  //       type: 'error',
  //       message: '',
  //     }),
  //   },
  // },

  computed: {
    alert() {
      return this.$store.state.alert;
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

      SessionService.signIn(user).then((result) => {
        if (result) {
          this.$router.push({ path: '/profile' });
        } else {
          this.alert.type = 'error';
          this.alert.message = 'Incorrect username or password.';
          this.$refs.password.reset();
        }
      });
      return true;
    },
  },
};
