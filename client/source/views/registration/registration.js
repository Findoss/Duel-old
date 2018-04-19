import debounce from 'debounce';
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
        nickname: {
          error: '',
          value: '',
          status: '',
          rules: Rules.nickname,
        },
        email: {
          error: '',
          value: '',
          status: '',
          rules: Rules.email,
        },
        password: {
          error: '',
          value: '',
          status: '',
          rules: Rules.password,
        },
      },
    };
  },

  created() {
    this.validation = debounce((formField) => {
      const field = formField;
      field.error = '';
      field.status = 'pending';
      field.rules(field.value, true)
        .then(() => {
          field.status = 'valid';
        })
        .catch((error) => {
          field.status = 'invalid';
          field.error = error.message;
        });
    }, 500);
  },

  methods: {
    submit() {
      if (this.form.nickname.status !== 'valid') {
        return this.validation(this.form.nickname);
      } else if (this.form.email.status !== 'valid') {
        return this.validation(this.form.email);
      } else if (this.form.password.status !== 'valid') {
        return this.validation(this.form.password);
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
          this.formError = 'There were problems creating your account.';
        }
      });
    },

  },
};
