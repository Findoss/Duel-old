export default {
  data() {
    return {
      errors: [],
      // name:null,
      // email:null,
      // pass:null
    };
  },
  methods: {
    checkForm(e) {
      // this.errors = [];
      // if(!this.name) this.errors.push("Name required.");
      // if(!this.email) {
      //   this.errors.push("Email required.");
      // } else if(!this.validEmail(this.email)) {
      //   this.errors.push("Valid email required.");
      // }
      // if(!this.errors.length) return true;
      e.preventDefault();
    },
  },
};
