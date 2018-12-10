import debounce from 'debounce';
import { mapActions } from 'vuex';

// Utils
import Rules from '@/utils/validation/rules';
import validation from '@/utils/validation';

export default {

  data() {
    return {
      fields: {
        nickname: {
          value: '',
          status: '',
          error: '',
          rules: [
            Rules.nickname,
            Rules.checkNickname,
          ],
        },
        email: {
          value: '',
          status: '',
          error: '',
          rules: [
            Rules.email,
            Rules.checkEmail,
          ],
        },
        password: {
          value: '',
          status: '',
          error: '',
          rules: [Rules.password],
        },
      },
      form: {
        isAvailable: true,
      },
    };
  },

  methods: {
    ...mapActions({
      registration: 'me/account/registration',
    }),

    submit() {
      if (!validation.form(this, 'fields')) return false;

      this.form.isAvailable = false;

      this.registration({
        nickname: this.fields.nickname.value,
        email: this.fields.email.value,
        password: this.fields.password.value,
      })
        .catch(() => {
          this.fields.nickname.value = '';
          this.fields.nickname.status = '';
          this.fields.email.value = '';
          this.fields.email.status = '';
          this.fields.password.value = '';
          this.fields.password.status = '';
        })
        .finally(() => {
          this.form.isAvailable = true;
        });

      return true;
    },
  },

  created() {
    this.validation = debounce((event) => {
      validation.field(this, 'fields', event.target.name);
    }, 500);
  },
};
