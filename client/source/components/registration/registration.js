import UserService from '../../services/user-service';
import Regexp from '../../modules/regexp';
import debounce from 'debounce';


export default {

  data() {
    return {
      nicknameError: '',
      emailError: '',
      passwordError: '',

      nicknameStyles: '',
      emailStyles: '',
      passwordStyles: '',

      nickname: '',
      email: '',
      password: '',
    };
  },
  created() {
    this.updateNickname = debounce(() => {
      const result = this.rulesNickname(this.nickname);
      if (!result) this.nicknameStyles = 'is-autocheck-successful';
      else this.nicknameStyles = 'is-autocheck-error';
      this.nicknameError = result;
    }, 500);
    this.updateEmail = debounce(() => {
      const result = this.rulesEmail(this.email);
      if (!result) this.emailStyles = 'is-autocheck-successful';
      else this.emailStyles = 'is-autocheck-error';
      this.emailError = result;
    }, 500);
    this.updatePassword = debounce(() => {
      const result = this.rulesPassword(this.password);
      if (!result) this.passwordStyles = 'is-autocheck-successful';
      else this.passwordStyles = 'is-autocheck-error';
      this.passwordError = result;
    }, 500);
  },
  watch: {
    nickname() {
      this.nicknameStyles = 'is-autocheck-loading';
      this.updateNickname();
    },
    email() {
      this.emailStyles = 'is-autocheck-loading';
      this.updateEmail();
    },
    password() {
      this.passwordStyles = 'is-autocheck-loading';
      this.updatePassword();
    },
  },
  methods: {
    rulesNickname(nickname) {
      if (nickname === '') return 'Nickname can\'t be blank';
      if (nickname.length < 4) return 'Nickname is too short (minimum is 4 characters)';
      if (nickname.length > 20) return 'Nickname is too long (maximum is 20 characters)';
      if (!Regexp.nickname.test(nickname)) return 'Nickname contains invalid characters';

      UserService.checkNickname(nickname).then((result) => {
        if (result.used) return false;
        return 'Nickname is already taken';
      });
    },
    rulesEmail(email) {
      if (email === '') return 'Email can\'t be blank';
      if (!Regexp.email.test(email)) return 'Email is invalid';
      UserService.checkEmail(email).then((result) => {
        if (!result.used) return false;
        return 'Email is already taken';
      });
    },
    rulesPassword(password) {
      if (password === '') return 'Password can\'t be blank';
      if (password.length < 6) return 'Password is too short (minimum is 7 characters)';
      if (password.length > 20) return 'Password is too long (maximum is 20 characters)';
      if (!Regexp.password.test(password)) return 'Password needs at least one number and at least one characters';
      return false;
    },
  },
};
