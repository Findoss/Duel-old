// Components
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
};
