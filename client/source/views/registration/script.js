import { mapActions } from 'vuex';

// Utils
import Rules from '@/utils/validation/rules';
import { validationForm } from '@/utils/validation/form';

export default {

  data () {
    return {
      form: {
        nickname: {
          value: '',
          status: false,
          rules: [
            Rules.nickname,
            Rules.checkNickname,
          ],
        },
        email: {
          value: '',
          status: false,
          rules: [
            Rules.email,
            Rules.checkEmail,
          ],
        },
        password: {
          value: '',
          status: false,
          rules: [Rules.password],
        },
      },
    };
  },

  methods: {
    ...mapActions({
      registration: 'me/account/registration',
    }),

    submit () {
      if (!validationForm(this, 'form')) return false;

      this.registration({
        nickname: this.form.nickname.value,
        email: this.form.email.value,
        password: this.form.password.value,
      })
        .catch(() => {
          this.$refs.password.reset();
          this.form.password.status = false;
        });

      return true;
    },
  },
};
