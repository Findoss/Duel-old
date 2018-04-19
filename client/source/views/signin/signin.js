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
        email: {
          error: '',
          value: '',
          status: '',
          rules: Rules.email,
        },
        password: {
          value: '',
          error: '',
          status: '',
        },
      },
    };
  },

  created() {
    this.validation = debounce((formField) => {
      const field = formField;
      field.error = '';
      field.status = 'pending';
      field.rules(field.value)
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
      if (this.form.email.status !== 'valid') {
        return this.validation(this.form.email);
      } else if (this.form.password.value === '') {
        this.form.password.status = 'invalid';
        this.form.password.error = 'Password can\'t be blank';
        return false;
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
