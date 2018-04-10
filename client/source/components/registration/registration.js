export default {
  data() {
    return {
      nicknameErrors: [],
      emailErrors: [],
      passwordErrors: [],
      qqq: '',
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

      this.nicknameErrors.push('Nickname can\'t be blank');
      this.nicknameErrors.push('Nickname is already taken');

      this.passwordErrors.push('Password is too short (minimum is 7 characters) and needs at least one number');
      this.passwordErrors.push('Password can\'t be blank');

      this.emailErrors.push('Email is invalid or already taken');
      this.emailErrors.push('Email can\'t be blank');


      if (this.nickname === '') {
        this.qqq = 'is-autocheck-error';
      } else {
        this.qqq = 'is-autocheck-successful';
      }


      // this.errors = [];
      // if(!this.name) this.errors.push("Name required.");
      // if(!this.email) {
      //   this.errors.push("Email required.");
      // } else if(!this.validEmail(this.email)) {
      //   this.errors.push("Valid email required.");
      // }
      // if(!this.errors.length) return true;
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
