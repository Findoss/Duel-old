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
          return false;
        }
        return 'Email is invalid';
      }
      return 'Email can\'t be blank';
    },
    updateEmail(email) {
      this.emailError = '';
      const result = this.validEmail(email);
      if (!result) {
        fetch(`http://localhost:3001/check?email=${email}`)
          .then(response =>
            response.json())
          .then((data) => {
            if (data.used) {
              this.emailStyles = 'is-autocheck-successful';
            } else {
              this.emailError = 'Nickname is already taken';
              this.emailStyles = 'is-autocheck-error';
            }
          })
          .catch(alert);
      } else {
        this.emailStyles = 'is-autocheck-error';
        this.emailError = result;
      }
    },
    validNickname(nickname) {
      if (nickname !== '') {
        if (nickname.length > 3) {
          if (nickname.length < 20) {
            if (/^[0-9a-zA-ZА-я_.-]+$/.test(nickname)) {
              return false;
            }
            return 'Nickname contains invalid characters';
          }
          return 'Nickname is too long (maximum is 20 characters)';
        }
        return 'Nickname is too short (minimum is 4 characters)';
      }
      return 'Nickname can\'t be blank';
    },
    updateNickname(nickname) {
      this.nicknameError = '';
      const result = this.validNickname(nickname);
      if (!result) {
        this.nicknameStyles = 'is-autocheck-loading';
        fetch(`http://localhost:3001/check?nickname=${nickname}`)
          .then(response =>
            response.json())
          .then((data) => {
            if (data.used) {
              this.nicknameStyles = 'is-autocheck-successful';
            } else {
              this.nicknameError = 'Nickname is already taken';
              this.nicknameStyles = 'is-autocheck-error';
            }
          })
          .catch(alert);
      } else {
        this.nicknameStyles = 'is-autocheck-error';
        this.nicknameError = result;
      }
    },
  },
};


// if (this.login == '' || this.senha == '') {
//   this.log = 'Preencha o campo para login.';
//   event.preventDefault();
// } else{
//   this.log = 'Go';
// }
