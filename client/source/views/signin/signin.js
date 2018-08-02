import { mapActions } from 'vuex';

// Utils
import Rules from '@/utils/validation/rules';
import validationForm from '@/utils/validation/form';

export default {

  computed: {
    alert() {
      return this.$store.state.me.account.alertSignin;
    },
  },

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
      showAlert: 'me/account/showAlertSignin',
    }),

    submit() {
      if (!validationForm(this, 'form')) return false;

      const user = {
        email: this.form.email.value,
        password: this.form.password.value,
      };

      this.signIn(user)
        .catch(() => {
          this.$refs.password.reset();
          this.form.password.status = false;
        });
    },

    closeAlert() {
      this.showAlert({
        type: 'error',
        message: null,
      });
    },
  },

  beforeRouteLeave(to, from, next) {
    this.showAlert({
      type: 'info',
      message: '',
    });
    next();
  },
};
