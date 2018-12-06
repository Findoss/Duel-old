import Router from '@/routes';
import { mapActions } from 'vuex';

// Utils
import Rules from '@/utils/validation/rules';
import { validationForm } from '@/utils/validation/form';

export default {

  data() {
    return {
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
      nickname: '',
    };
  },

  methods: {

    ...mapActions({
      passwordNew: 'me/account/passwordNew',
    }),

    submit() {
      if (!validationForm(this, 'form')) {
        return false;
      } else if (this.form.password.value !== this.form.confirmPassword.value) {
        this.error = 'Password confirmation doesn\'t match the password.';
        this.$refs.password.reset();
        this.$refs.confirmPassword.reset();
        this.form.password.status = false;
        this.form.confirmPassword.status = false;
        return false;
      }

      this.passwordNew({
        newPassword: this.form.password.value,
        hash: this.$route.params.hash,
      })
        .catch(() => {
          // this.$refs.password.reset();
          // this.$refs.confirmPassword.reset();
          console.log('nope');

          this.form.password.status = false;
          this.form.confirmPassword.status = false;
        });
    },

  },

};
