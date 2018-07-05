// Utils
import Rules from '@/utils/validation/rules';
import validationForm from '@/utils/validation/form';

export default {
  data() {
    return {
      error: '',
      form: {
        password: {
          value: '',
          status: false,
          rules: [Rules.password],
        },
        confirmPassword: {
          value: '',
          status: false,
          rules: [Rules.password],
        },
      },
      nickname: '{{_nickname_}}',
    };
  },

  methods: {
    submit() {
      if (!validationForm(this, 'form')) {
        return false;
      } else if (this.form.password.value !== this.form.confirmPassword.value) {
        this.error = 'Password confirmation doesn\'t match the password.';
        this.$refs.password.reset();
        this.$refs.confirmPassword.reset();
        return false;
      }

      console.log(this.form.password.value);
      // look store user newPassword
    },
  },
};
