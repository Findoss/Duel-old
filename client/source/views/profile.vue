<template>
  <div class="card">
    <h1 class="name">{{ name }}</h1>
    <p>Email {{ email }}</p>
    <p>Password {{ Password }}</p>
  </div>
</template>


<script>
  export default {
  data: function () {
    return {
      name: '0000',
      email: '0000@000.000',
      pass: '0000'
    }
  },
  methods:{
    checkForm:function() {
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
  }
}
</script>