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
          rules: [Rules.email],
        },
        password: {
          value: '',
          status: false,
          rules: [Rules.required],
        },
      },
    };
  },


  methods: {
    ...mapActions({
      signIn: 'me/account/signIn',
    }),

    submit() {
      if (!validationForm(this, 'form')) return false;

      this.signIn({
        email: this.form.email.value,
        password: this.form.password.value,
      })
        .catch(() => {
          this.$refs.password.reset();
          this.form.password.status = false;
        });
    },
  },

};
