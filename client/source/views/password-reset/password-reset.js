// Utils
import Rules from '@/utils/validation/rules';
import validationForm from '@/utils/validation/form';

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
      error: '',
      form: {
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
      if (!validationForm(this, 'form')) {
        this.$refs.email.validation();
        return false;
      }

      const email = {
        email: this.form.email.value,
      };

      console.log(email);
      this.success = !this.success;

      // look store user resetPassword
    },
  },
};
