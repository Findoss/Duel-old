import Router from '@/routes';
import { mapActions } from 'vuex';

// Utils
import Rules from '@/utils/validation/rules';
import validationForm from '@/utils/validation/form';

export default {

  data() {
    return {
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
      isSendResetPassword: false,
    };
  },

  methods: {

    ...mapActions({
      passwordReset: 'me/account/passwordReset',
    }),

    submit() {
      if (!validationForm(this, 'form')) {
        this.$refs.email.validation();
        return false;
      }

      this.passwordReset({
        email: this.form.email.value,
      })
        .then(() => {
          this.isSendResetPassword = !this.isSendResetPassword;
        })
        .catch(() => {
          this.$refs.password.reset();
          this.form.password.status = false;
        });
    },

    goSignin() {
      Router.push({ name: 'root' });
    },
  },

};
