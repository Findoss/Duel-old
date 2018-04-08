<template>
  <div class="card">
    <h1 class="title">Join Duel</h1>
    <p>Create your personal account</p>

    <p v-if="errors.length" class="errors">
      <b>Please correct the following error(s):</b>
      <ul>
        <li v-for="error in errors">{{ error }}</li>
      </ul>
    </p>

    <form action="/reg" accept-charset="UTF-8" method="post" @submit="checkForm">
      
      <label for="login" class="form-input-label">Username</label>
      <input name="login" id="login" class="form-control form-input" tabindex="1" autofocus="autofocus" type="text">
      <p class="hint">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>

      <label for="email" class="form-input-label">Email</label>
      <input name="email" id="email" class="form-control form-input" tabindex="2" type="email">
      <p class="hint">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates, quia.</p>

      <label for="password" class="form-input-label">Password</label>
      <input name="password" id="password" class="form-control form-input" tabindex="3" type="password">
      <p class="hint">Lorem ipsum dolor sit amet consectetur adipisicing.</p>

      <hr>
      <p>By clicking “Create an account” below, you agree to our terms of service and privacy statement. We’ll occasionally send you account related emails
      </p>
      <hr>
      <button class="form-control button-primary" tabindex="4" type="submit">Create an account</button>
  </form>
  </div>
</template>


<script>
  export default {
    data: function () {
      return {
        errors:[],
        // name:null,
        // email:null,
        // pass:null
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
