import debounce from 'debounce';
import UserService from '../../services/user-service';
import Regexp from '../../modules/regexp';

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
    this.updateNickname = debounce(function updateNickname() {
      return new Promise((resolve) => {
        this.nicknameError = '';
        this.nicknameStyles = 'is-autocheck-loading';
        this.rulesNickname(this.nickname)
          .then(() => {
            this.nicknameStyles = 'is-autocheck-successful';
            resolve('sd');
          })
          .catch((error) => {
            this.nicknameStyles = 'is-autocheck-error';
            this.nicknameError = error.message;
            // reject();
          });
      });
    }, 500);
    this.updateEmail = debounce(() => new Promise((resolve) => {
      this.emailError = '';
      this.emailStyles = 'is-autocheck-loading';
      this.rulesEmail(this.email)
        .then(() => {
          this.emailStyles = 'is-autocheck-successful';
          resolve();
        })
        .catch((error) => {
          this.emailStyles = 'is-autocheck-error';
          this.emailError = error.message;
        });
    }), 500);
    this.updatePassword = debounce(() => new Promise((resolve) => {
      this.passwordError = '';
      this.rulesPassword(this.password)
        .then(() => {
          this.passwordStyles = 'is-autocheck-successful';
          resolve();
        })
        .catch((error) => {
          this.passwordStyles = 'is-autocheck-error';
          this.passwordError = error.message;
        });
    }), 500);
  },
  methods: {
    submit() {
      this.updateNickname(this.nickname)
        .then(() => {
          console.log('YES');
        }).catch(() => {
          console.log('NOPE');
        });


      // Promise.all([
      //   this.updateNickname(this.nickname),
      //   this.updateEmail(this.email),
      //   this.updatePassword(this.password),
      // ]).then(() => {
      //   console.log('YES');
      //   const user = { nickname: this.nickname, email: this.email, password: this.password };
      //   UserService.registration(user).then((result) => {
      //     if (result.error === undefined) console.log(result.message);
      //     else console.error(result.error);
      //   });
      // }).catch(() => {
      //   console.log('NOPE');
      // });
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
