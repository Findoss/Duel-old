import { mapActions } from 'vuex';

// Utils
import Rules from '@/utils/validation/rules';
import validationForm from '@/utils/validation/form';

// Components
import BaseAlert from '@/components/BaseAlert/BaseAlert.vue';
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import BaseTextField from '@/components/BaseTextField/BaseTextField.vue';

export default {

  components: {
    'z-alert': BaseAlert,
    'z-button': BaseButton,
    'z-text-field': BaseTextField,
  },

  computed: {
    alert() {
      return this.$store.state.user.signin.alert;
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
      signIn: 'user/signIn',
      showAlert: 'user/signin/showAlert',
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
