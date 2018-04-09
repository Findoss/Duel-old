<template>
  <div class="card">

    <h1 class="card-title">Sign in to Duel</h1>
    
    <div class="error">{{ errors }}</div>

    <form action="/session" accept-charset="UTF-8" method="post">
      <input name="login" id="login" tabindex="1" autofocus="autofocus" type="text" placeholder="Username">
      <input name="password" id="password" tabindex="2" type="password" placeholder="password">
      <button tabindex="3" type="submit">Sing in</button>

      <!-- <br><br>
      <center>sign with:</center>
      <img src="../assets/000.png" alt="" class="social">
      <img src="../assets/000.png" alt="" class="social">
      <img src="../assets/000.png" alt="" class="social">
      <img src="../assets/000.png" alt="" class="social">
      <img src="../assets/000.png" alt="" class="social">
      -->
  </form>
  <p class="new-acc">
    <router-link to="/password_reset">Forgot password?</router-link>
    <br><br>
    New to Duel? <router-link to="/registration">Create an account</router-link>.</p>
  </div>
</template>

<script>
  export default {
    data: function () {
      return {
        errors:"",
      }
    }
  }
</script>

<style scope>
  @import "../styles/typography.css";
  @import "../styles/input.css";
  @import "../styles/link.css";
  @import "../styles/button.css";

  .card {
    min-width: 250px;
    max-width: 400px;
    margin: 0 auto;
    margin-top: 30px;
    padding: 30px;
    background-color: rgba(0, 0, 0, .8);

    border: 4px rgba(120, 90, 90, 0.493);
    border-style: solid double solid;
  }

  .card input {
    text-align: center;
    margin-bottom: 10px;
  }

  .card-title {
    text-align: center;
  }

  .new-acc {
    text-align: center;
  }

  .error {
    color: var(--color-red);
    /* border: 1px solid;
    border-color: var(--color-red);
    padding: 10px;
    text-align: center;
    margin-bottom: 15px;*/
  }

  .social {
    margin: 10px;
    width: 80px;
  }
</style>
