import Rules from '@/modules/validation-rules';
import UserService from '@/services/user-service';
import BaseTextField from '@/components/BaseTextField/BaseTextField.vue';

export default {

  components: {
    'text-field': BaseTextField,
  },

  data() {
    return {
      form: {
        error: '',
        email: {
          value: '',
          status: false,
          rules: [
            Rules.email,
          ],
        },
        password: {
          value: '',
        },
      },
    };
  },

  methods: {
    submit() {
      if (!this.form.email.status) {
        return this.$refs.email.validation();
      }

      const user = {
        email: this.form.email.value,
        password: this.form.password.value,
      };

      UserService.signin(user).then((result) => {
        if (result.code === undefined) {
          this.$router.push({ path: 'profile' });
        } else {
          this.form.error = 'Incorrect username or password.';
        }
      });
    },
  },
};
