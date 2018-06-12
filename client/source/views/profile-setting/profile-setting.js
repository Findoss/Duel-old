// Services
import * as MeService from '@/services/me';
// import * as SessionService from '@/services/session';

// Components
// Utils
import Rules from '@/utils/validation/rules';

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

  data() {
    return {
      loading: false,
      form: {
        error: '',
        oldPassword: {
          value: '',
          status: false,
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
        },
      },
    };
  },

  computed: {
    // pathAvatar() {
    //   return require(`@/assets/avatars/${this.user.avatar}.png`);
    // },
  },

  created() {
    // MeService.getMe()
    //   .then((user) => {
    //     this.user = user;
    //     this.loading = true;
    //   })
    //   .catch((error) => {
    //     console.warn(error);
    //     SessionService.signOut();
    //     this.$router.push({ path: '/signin' });
    //   });
  },

  methods: {
    // signOut() {
    //   SessionService.signOut();
    //   this.$router.push({ path: '/signin' });
    // },
  },
};
