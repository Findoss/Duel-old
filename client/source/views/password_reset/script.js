import debounce from 'debounce';
import Router from '@/routes';
import { mapActions } from 'vuex';

// Utils
import Rules from '@/utils/validation/rules';
import validation from '@/utils/validation';

export default {

  data() {
    return {
      fields: {
        email: {
          value: '',
          status: '',
          error: '',
          rules: [Rules.email],
        },
      },
      form: {
        isSuccessSend: false,
        isAvailable: true,
      },
      isSendResetPassword: false,
    };
  },

  methods: {

    ...mapActions({
      passwordReset: 'me/account/passwordReset',
    }),

    submit() {
      if (!validation.form(this, 'fields')) return false;

      this.form.isAvailable = false;

      this.passwordReset({
        email: this.fields.email.value,
      })
        .then(() => {
          this.form.isSuccessSend = !this.form.isSuccessSend;
        })
        .catch(() => {
          this.fields.email.value = '';
          this.fields.email.status = '';
        })
        .finally(() => {
          this.form.isAvailable = true;
        });
    },

    goSignin() {
      Router.push({ name: 'root' });
    },
  },

  created() {
    this.validation = debounce((event) => {
      validation.field(this, 'fields', event.target.name);
    }, 500);
  },

};
