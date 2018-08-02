// Utils
import Rules from '@/utils/validation/rules';
import validationForm from '@/utils/validation/form';

export default {

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

      // look store me resetPassword
    },
  },
};
