import { mapActions, mapGetters } from 'vuex';

// Utils
import Rules from '@/utils/validation/rules';
import validationForm from '@/utils/validation/form';

export default {

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

  computed: {
    ...mapGetters([
      'pathAvatar',
      'pathSkill',
    ]),
  },

  methods: {
    ...mapActions({
      deleteAccount: 'user/account/deleteAccount',
      updateAccountDataNoStore: 'user/updateAccountDataNoStore',
      loadAvatarsList: 'user/loadAvatarsList',
    }),

    submitChangeNickname() {
      if (!validationForm(this, 'form2')) return false;

      this.updateAccountDataNoStore({
        field: 'nickname',
        data: this.form2.newNickname.value,
      })
        .then((response) => {
          this.$store.commit('user/SET_NICKNAME', this.form2.newNickname.value); // HUCK
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

      this.updateAccountDataNoStore({
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
        this.updateAccountDataNoStore({
          field: 'avatar',
          data: avatar,
        })
          .then((response) => {
            this.$store.commit('user/SET_AVATAR', avatar); // HUCK
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
