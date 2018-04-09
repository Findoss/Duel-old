export default {
  data() {
    return {
      errors: [],
      nickname: null,
      email: null,
      password: null,
    };
  },
  methods: {
    submit() {
      console.log(this.nickname);
      console.log(this.email);
      console.log(this.password);

      if (this.nickname === '') {
        this.errors.push('EHHA');
      }

      if (this.email === '') {
        this.errors.push('EHHA');
      }

      if (this.password === '') {
        this.errors.push('EHHA');
      }

      console.log(this.errors);

      // this.errors = [];
      // if(!this.name) this.errors.push("Name required.");
      // if(!this.email) {
      //   this.errors.push("Email required.");
      // } else if(!this.validEmail(this.email)) {
      //   this.errors.push("Valid email required.");
      // }
      // if(!this.errors.length) return true;
    },
  },
};


// if (this.login == '' || this.senha == '') {
//   this.log = 'Preencha o campo para login.';
//   event.preventDefault();
// } else{
//   this.log = 'Go';
// }
