import { mapActions } from 'vuex';

// Utils
import Rules from '@/utils/validation/rules';
import validationForm from '@/utils/validation/form';

export default {

  data() {
    return {
      error: '',
      form: {
        nickname: {
          value: 'aaaa',
          status: false,
          rules: [
            Rules.nickname,
            Rules.checkNickname,
          ],
        },
        email: {
          value: 'aa@aa.aa',
          status: false,
          rules: [
            Rules.email,
            Rules.checkEmail,
          ],
        },
        password: {
          value: 'asf5sd16f5a1s6',
          status: false,
          rules: [Rules.password],
        },
      },
    };
  },

  methods: {
    ...mapActions({
      registration: 'user/account/registration',
    }),

    submit() {
      if (!validationForm(this, 'form')) return false;

      const user = {
        nickname: this.form.nickname.value,
        email: this.form.email.value,
        password: this.form.password.value,
      };

      this.registration(user)
        .catch((error) => {
          this.error = error.message;
          this.$refs.password.reset();
          this.form.password.status = false;
        });
    },

  },
};
