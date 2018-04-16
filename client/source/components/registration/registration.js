import debounce from 'debounce';
import UserService from '../../services/user-service';
import Regexp from '../../modules/regexp';

export default {

  data() {
    return {
      formError: '',

      nicknameError: '',
      emailError: '',
      passwordError: '',

      nicknameStyles: '',
      emailStyles: '',
      passwordStyles: '',

      nickname: '',
      email: '',
      password: '',

      nicknameValidStatus: false,
      emailValidStatus: false,
      passwordValidStatus: false,
    };
  },
  created() {
    this.updateNickname = debounce(() => {
      this.nicknameError = '';
      this.nicknameValidStatus = false;
      this.nicknameStyles = 'is-autocheck-loading';
      this.rulesNickname(this.nickname)
        .then(() => {
          this.nicknameStyles = 'is-autocheck-successful';
          this.nicknameValidStatus = true;
        })
        .catch((error) => {
          this.nicknameStyles = 'is-autocheck-error';
          this.nicknameError = error.message;
        });
    }, 500);
    this.updateEmail = debounce(() => {
      this.emailError = '';
      this.emailValidStatus = false;
      this.emailStyles = 'is-autocheck-loading';
      this.rulesEmail(this.email)
        .then(() => {
          this.emailStyles = 'is-autocheck-successful';
          this.emailValidStatus = true;
        })
        .catch((error) => {
          this.emailStyles = 'is-autocheck-error';
          this.emailError = error.message;
        });
    }, 500);
    this.updatePassword = debounce(() => {
      this.passwordError = '';
      this.passwordValidStatus = false;
      this.rulesPassword(this.password)
        .then(() => {
          this.passwordStyles = 'is-autocheck-successful';
          this.passwordValidStatus = true;
        })
        .catch((error) => {
          this.passwordStyles = 'is-autocheck-error';
          this.passwordError = error.message;
        });
    }, 500);
  },
  methods: {
    submit() {
      if (!this.nicknameValidStatus) {
        return this.updateNickname(this.nickname);
      } else if (!this.emailValidStatus) {
        return this.updateEmail(this.email);
      } else if (!this.passwordValidStatus) {
        return this.updatePassword(this.password);
      }
      const user = { nickname: this.nickname, email: this.email, password: this.password };
      UserService.registration(user).then((result) => {
        if (result.code === undefined) {
          this.$router.push({ path: 'profile' });
        } else {
          this.formError = 'There were problems creating your account.';
        }
      });
    },
    rulesNickname(nickname) {
      return new Promise((resolve, reject) => {
        if (nickname === '') {
          reject(new Error('Nickname can\'t be blank'));
        } else if (nickname.length < 4) {
          reject(new Error('Nickname is too short (minimum is 4 characters)'));
        } else if (nickname.length > 20) {
          reject(new Error('Nickname is too long (maximum is 20 characters)'));
        } else if (!Regexp.nickname.test(nickname)) {
          reject(new Error('Nickname contains invalid characters'));
        } else {
          UserService.checkNickname(nickname).then((result) => {
            if (result.used) resolve();
            reject(new Error('Nickname is already taken'));
          });
        }
      });
    },
    rulesEmail(email) {
      return new Promise((resolve, reject) => {
        if (email === '') {
          reject(new Error('Email can\'t be blank'));
        } else if (!Regexp.email.test(email)) {
          reject(new Error('Email is invalid'));
        } else {
          UserService.checkEmail(email).then((result) => {
            if (result.used) resolve();
            reject(new Error('Email is already taken'));
          });
        }
      });
    },
    rulesPassword(password) {
      return new Promise((resolve, reject) => {
        if (password === '') {
          reject(new Error('Email can\'t be blank'));
        } else if (password.length < 6) {
          reject(new Error('Password is too short (minimum is 7 characters)'));
        } else if (password.length > 20) {
          reject(new Error('Password is too long (maximum is 20 characters)'));
        } else if (!Regexp.password.test(password)) {
          reject(new Error('Password needs at least one number and at least one characters'));
        } else {
          resolve();
        }
      });
    },
  },
};
