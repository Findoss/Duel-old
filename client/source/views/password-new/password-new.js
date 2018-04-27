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
        password: {
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
      nickname: '{{_nickname_}}',
    };
  },

  methods: {
    submit() {
      if (!this.form.password.status) {
        this.$refs.password.validation();
        return false;
      } else if (!this.form.confirmPassword.status) {
        this.$refs.confirmPassword.validation();
        return false;
      } else if (this.form.password.value !== this.form.confirmPassword.value) {
        this.form.error = 'Password confirmation doesn\'t match the password.';
        this.$refs.password.reset();
        this.$refs.confirmPassword.reset();
        return false;
      }

      console.log(this.form.password.value);


      // const email = {
      //   email: this.form.email.value,
      // };

      // console.log(email);
      // this.success = !this.success;

      // UserService.signin(user).then((result) => {
      //   if (result.code === undefined) {
      //     this.$router.push({ path: 'profile' });
      //   } else {
      //     this.form.error = 'ERROR TODO';
      //     this.form.error = 'It looks like you clicked on an invalid password reset link. Please try again.';
      //   }
      // });
      return true;
    },
  },
};
