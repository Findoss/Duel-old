import debounce from 'debounce';
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
        password: {
          value: '',
          status: '',
          error: '',
          rules: [Rules.required],
        },
      },
      form: {
        isAvailable: true,
        error: '',
      },
    };
  },

  methods: {
    ...mapActions({
      signIn: 'me/account/signIn',
    }),

    submit() {
      if (!validation.form(this, 'fields')) return false;

      this.form.isAvailable = false;

      this.signIn({
        email: this.fields.email.value,
        password: this.fields.password.value,
      })
        .catch((error) => {
          this.form.error = error.message;
          this.fields.password.value = '';
          this.fields.password.status = '';
        })
        .finally(() => {
          this.form.isAvailable = true;
        });
    },

    closeAlert() {
      this.form.error = '';
    },
  },

  created() {
    this.validation = debounce((event) => {
      validation.field(this, 'fields', event.target.name);
    }, 500);
  },

};
