// Utils
import Rules from '@/utils/validation/rules';

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

  data() {
    return {
      form: {
        error: '',
        email: {
          value: '',
          status: false,
          rules: [
            Rules.email,
            Rules.checkEmail,
          ],
        },
      },
      success: false,
    };
  },

  methods: {
    submit() {
      if (!this.form.email.status) {
        this.$refs.email.validation();
        return false;
      }

      const email = {
        email: this.form.email.value,
      };

      console.log(email);
      this.success = !this.success;

      // UserService.signin(user).then((result) => {
      //   if (result.code === undefined) {
      //     this.$router.push({ path: 'profile' });
      //   } else {
      //     this.form.error = 'ERROR TODO.';
      //   }
      // });
      return true;
    },
  },
};
