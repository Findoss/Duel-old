import UserService from '../../services/user-service';

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
  methods: {
    submit() {

    },
    validPassword(password) {
      if (password !== '') {
        if (password.length > 6) {
          if (password.length < 20) {
            if (/.(?=.*\d)(?=.*[a-zA-ZА-я])/.test(password)) {
              return false;
            }
            return 'Password needs at least one number and at least one characters';
          }
          return 'Password is too long (maximum is 20 characters)';
        }
        return 'Password is too short (minimum is 7 characters)';
      }
      return 'Password can\'t be blank';
    },
    updatePassword(password) {
      this.passwordError = '';
      const result = this.validPassword(password);
      if (!result) {
        this.passwordStyles = 'is-autocheck-successful';
      } else {
        this.passwordStyles = 'is-autocheck-error';
        this.passwordError = result;
      }
    },
    validEmail(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (email !== '') {
        if (re.test(email)) {
          UserService.checkEmail(email).then((result) => {
            if (result.used) return false;
            return 'Email is already taken';
          });
        } else return 'Email is invalid';
      } else return 'Email can\'t be blank';
    },
    updateEmail(email) {
      this.emailError = '';
      this.emailStyles = 'is-autocheck-loading';
      const result = this.validEmail(email);
      setTimeout(() => {
        if (!result) this.emailStyles = 'is-autocheck-successful';
        else this.emailStyles = 'is-autocheck-error';
        this.emailError = result;
      }, 1000);
    },
    validNickname(nickname) {
      if (nickname !== '') {
        if (nickname.length > 3) {
          if (nickname.length < 20) {
            if (/^[0-9a-zA-ZА-я_.-]+$/.test(nickname)) {
              UserService.checkNickname(nickname).then((result) => {
                if (result.used) return false;
                return 'Nickname is already taken';
              });
            } else return 'Nickname contains invalid characters';
          } else return 'Nickname is too long (maximum is 20 characters)';
        } else return 'Nickname is too short (minimum is 4 characters)';
      } else return 'Nickname can\'t be blank';
    },
    updateNickname(nickname) {
      this.nicknameStyles = 'is-autocheck-loading';
      const result = this.validNickname(nickname);
      setTimeout(() => {
        if (!result) this.nicknameStyles = 'is-autocheck-successful';
        else this.nicknameStyles = 'is-autocheck-error';
        this.nicknameError = result;
      }, 1000);
    },
  },
};
