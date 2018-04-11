export default {
  data() {
    return {
      nicknameErrors: [],
      emailErrors: [],
      passwordErrors: [],
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
      this.nicknameErrors = [];
      this.emailErrors = [];
      this.passwordErrors = [];

      this.nicknameStyles = '';
      this.emailStyles = '';
      this.passwordStyles = '';


      // this.nicknameErrors.push('Nickname is already taken');

      // this.passwordErrors.push('Password is too short (minimum is 7 characters) and needs at least one number');
      // this.passwordErrors.push('Password can\'t be blank');

      // this.emailErrors.push('Email is invalid or already taken');
      // this.emailErrors.push('Email can\'t be blank');


      if (this.nickname === '') {
        this.nicknameStyles = 'is-autocheck-error';
        this.nicknameErrors.push('Nickname can\'t be blank');
      } else {
        console.log(this.nickname.length);
        this.nicknameStyles = 'is-autocheck-successful';
      }

      if (this.email === '') {
        this.emailStyles = 'is-autocheck-error';
        this.emailErrors.push('Email can\'t be blank');
      } else {
        this.emailStyles = 'is-autocheck-successful';
      }


      if (this.password === '') {
        this.passwordStyles = 'is-autocheck-error';
        this.passwordErrors.push('Password can\'t be blank');
      } else if (this.password.length < 7) {
        this.passwordStyles = 'is-autocheck-error';
        this.passwordErrors.push('Password is too short (minimum is 7 characters) and needs at least one number');
      } else {
        this.passwordStyles = 'is-autocheck-successful';
      }
    },
    validEmail(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
  },
};


// if (this.login == '' || this.senha == '') {
//   this.log = 'Preencha o campo para login.';
//   event.preventDefault();
// } else{
//   this.log = 'Go';
// }
