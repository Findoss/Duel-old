// Components
import * as MeService from '@/services/me';
import * as SessionService from '@/services/session';

// Utils
import Rules from '@/utils/validation/rules';

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

  data() {
    return {
      alert: {
        type: 'info',
        message: '',
      },
      form: {
        error: '',
        oldPassword: {
          value: '',
          status: false,
          rules: [Rules.required],
        },
        newPassword: {
          value: '',
          status: false,
          rules: [Rules.password],
        },
        confirmPassword: {
          value: '',
          status: false,
          rules: [Rules.password],
        },
      },
      form2: {
        error: '',
        newNickname: {
          value: '',
          status: false,
          rules: [
            Rules.nickname,
            Rules.checkNickname,
          ],
        },
      },
    };
  },

  methods: {
    submitDeleteAccount() {
      MeService.deleteAccount()
        .then((response) => {
          this.$store.commit('authorization/showAlert', {
            type: 'info',
            message: response.message,
          });
          SessionService.signOut()
            .then(() => this.$router.push({ path: '/signin' }));
        })
        .catch((error) => {
          console.warn(error);
        });
    },

    submitChangeNickname() {
      if (!this.form2.newNickname.status) {
        this.$refs.newNickname.validation();
        return false;
      }

      MeService.updateNickname({ nickname: this.form2.newNickname.value })
        .then((response) => {
          if (response.code === undefined) this.alert.type = 'success';
          else this.alert.type = 'error';
          this.alert.message = response.message;
        })
        .catch((error) => {
          console.warn(error);
        });
      return true; // ?? todo
    },

    submitChangePassword() {
      if (!this.form.oldPassword.status) {
        this.$refs.oldPassword.validation();
        return false;
      } else if (!this.form.newPassword.status) {
        this.$refs.newPassword.validation();
        return false;
      } else if (!this.form.confirmPassword.status) {
        this.$refs.confirmPassword.validation();
        return false;
      } else if (this.form.newPassword.value !== this.form.confirmPassword.value) {
        this.alert = {
          type: 'error',
          message: 'Password confirmation doesn\'t match the password.',
        };
        this.$refs.newPassword.reset();
        this.$refs.confirmPassword.reset();
        return false;
      }

      const passwords = {
        oldPassword: this.form.oldPassword.value,
        newPassword: this.form.newPassword.value,
      };

      MeService.updatePassword(passwords)
        .then((response) => {
          if (response.code === undefined) this.alert.type = 'success';
          else this.alert.type = 'error';
          this.alert.message = response.message;
          this.$refs.oldPassword.reset();
          this.$refs.newPassword.reset();
          this.$refs.confirmPassword.reset();
          this.form.oldPassword.status = false;
          this.form.newPassword.status = false;
          this.form.confirmPassword.status = false;
        })
        .catch((error) => {
          console.warn(error);
        });
      return true; // ?? todo
    },

  },
};
