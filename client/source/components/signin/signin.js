import debounce from 'debounce';
import UserService from '../../services/user-service';
import Regexp from '../../modules/regexp';

export default {
  data() {
    return {
      formError: '',

      email: '',
      emailError: '',
      emailStyles: '',

      password: '',
    };
  },
  created() {
    this.updateEmail = debounce(() => {
      this.emailError = '';
      this.emailValidStatus = false;
      this.emailStyles = 'is-autocheck-loading';
      this.rulesEmail(this.email)
        .then(() => {
          this.emailStyles = '';
          this.emailValidStatus = true;
        })
        .catch((error) => {
          this.emailStyles = 'is-autocheck-error';
          this.emailError = error.message;
        });
    }, 500);
  },
  methods: {
    submit() {
      if (
        this.emailValidStatus &&
        this.password !== ''
      ) {
        const user = { email: this.email, password: this.password };
        UserService.signin(user).then((result) => {
          if (result.code === undefined) {
            this.$router.push({ path: 'profile' });
          } else {
            this.formError = 'Incorrect username or password.';
          }
        });
      } else {
        this.updateEmail(this.email);
      }
    },
    rulesEmail(email) {
      return new Promise((resolve, reject) => {
        if (email === '') {
          reject(new Error('Email can\'t be blank'));
        } else if (!Regexp.email.test(email)) {
          reject(new Error('Email is invalid'));
        } else {
          resolve();
        }
      });
    },
  },
};
