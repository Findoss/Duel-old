<template>
  <div class="card">

    <h1 class="card-title">Sign in to Duel</h1>
    
    <form action="/session" accept-charset="UTF-8" method="post">

      <label for="login">
        Username
      </label>
      <input name="login" id="login" tabindex="1" autofocus="autofocus" type="text">

      <label for="password">
        Password <router-link class="right" to="/password_reset">Forgot password?</router-link>
      </label>
      <input name="password" id="password" tabindex="2" type="password">

      <button tabindex="3" type="submit">Sing in</button>
  </form>
  <p class="new-acc">New to Duel? <router-link to="/reg">Create an account</router-link>.</p>
  </div>
</template>

<style scope>
  @import "../styles/typography.css";
  @import "../styles/input.css";
  @import "../styles/link.css";
  @import "../styles/button.css";

  .card {
    min-width: 250px;
    max-width: 400px;
    margin: 0 auto;
    padding: 30px;
    background-color: rgba(0, 0, 0, .65);
  }

  .card-title {
    text-align: center;
  }

  .card input {
    margin-bottom: 15px;
  }

  .right {
    float: right;
  }

  .new-acc {
    text-align: center;
  }
</style>
