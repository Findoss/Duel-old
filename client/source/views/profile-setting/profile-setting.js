import { mapActions } from 'vuex';

// Utils
import Rules from '@/utils/validation/rules';
import validationForm from '@/utils/validation/form';

// Components
import BaseAlert from '@/components/BaseAlert/BaseAlert.vue';
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import BaseLoading from '@/components/BaseLoading/BaseLoading.vue';
import BaseTextField from '@/components/BaseTextField/BaseTextField.vue';

export default {

  components: {
    'z-alert': BaseAlert,
    'z-button': BaseButton,
    'z-loading': BaseLoading,
    'z-text-field': BaseTextField,
  },

  created() {
    this.loadAvatarsList()
      .then((response) => {
        this.avatars = response.avatars;
      });
  },

  data() {
    return {
      avatars: null,
      alerts: [],
      form: {
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
    ...mapActions({
      deleteAccount: 'user/deleteAccount',
      updateAccauntData: 'user/updateAccauntData',
      loadAvatarsList: 'user/loadAvatarsList',
    }),

    submitChangeNickname() {
      if (!validationForm(this, 'form2')) return false;

      this.updateAccauntData({
        field: 'nickname',
        data: this.form2.newNickname.value,
      })
        .then((response) => {
          this.alerts.push({
            type: 'success',
            message: response.message,
          });
        })
        .catch((error) => {
          this.alerts.push({
            type: 'error',
            message: error.message,
          });
        });
    },

    submitChangePassword() {
      if (!validationForm(this, 'form')) return false;
      else if (this.form.newPassword.value !== this.form.confirmPassword.value) {
        alerts.push({
          type: 'error',
          message: 'Password confirmation doesn\'t match the password.',
        });
        this.$refs.newPassword.reset();
        this.$refs.confirmPassword.reset();
        this.form.newPassword.status = false;
        this.form.confirmPassword.status = false;
        return false;
      }

      const passwords = {
        oldPassword: this.form.oldPassword.value,
        newPassword: this.form.newPassword.value,
      };

      this.updateAccauntData({
        field: 'password',
        data: passwords,
      })
        .then((response) => {
          this.alerts.push({
            type: 'success',
            message: response.message,
          });
        })
        .catch((error) => {
          this.alerts.push({
            type: 'error',
            message: error.message,
          });
          this.$refs.oldPassword.reset();
          this.$refs.newPassword.reset();
          this.$refs.confirmPassword.reset();
          this.form.oldPassword.status = false;
          this.form.newPassword.status = false;
          this.form.confirmPassword.status = false;
        });
    },

    selectAvatar(avatar) {
      if (avatar !== this.$store.state.user.avatar) {
        this.updateAccauntData({
          field: 'avatar',
          data: avatar,
        })
          .then((response) => {
            this.$store.commit('user/setAvatar', avatar); // HUCK
            this.alerts.push({
              type: 'success',
              message: response.message,
            });
          })
          .catch((error) => {
            this.alerts.push({
              type: 'error',
              message: error.message,
            });
          });
      }
    },

    pathAvatar(avatar) {
      return require(`@/assets/avatars/${avatar}.png`);
    },

    isSelectedAvatar(avatar) {
      return avatar === this.$store.state.user.avatar;
    },

    deleteAlert(index) {
      this.alerts.splice(index, 1);
    },

    beforeRouteLeave(to, from, next) {
      this.alerts = [];
      next();
    },

  },
};
