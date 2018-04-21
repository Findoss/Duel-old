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
    submit() {
      if (!this.form.nickname.status) {
        return this.$refs.nickname.validation();
      } else if (!this.form.email.status) {
        return this.$refs.email.validation();
      } else if (!this.form.password.status) {
        return this.$refs.password.validation();
      }

      const user = {
        nickname: this.form.nickname.value,
        email: this.form.email.value,
        password: this.form.password.value,
      };

      UserService.registration(user).then((result) => {
        if (result.code === undefined) {
          this.$router.push({ path: 'profile' });
        } else {
          this.form.error = 'There were problems creating your account.';
        }
      });
    },

  },
};
