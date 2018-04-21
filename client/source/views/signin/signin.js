import Rules from '@/modules/validation-rules';
import UserService from '@/services/user-service';

import BaseAlert from '@/components/BaseAlert/BaseAlert.vue';
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import BaseTextField from '@/components/BaseTextField/BaseTextField.vue';

export default {

  components: {
    'z-text-field': BaseTextField,
    'z-button': BaseButton,
    'z-alert': BaseAlert,
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
