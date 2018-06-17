<template>
  <div id="app">
    <div id="nav">
      fast navigate
      <router-link to="/signin">singin</router-link> |
      <router-link to="/registration">registration</router-link>  |
      <router-link to="/password-reset">password-reset</router-link>  |
      <router-link to="/password-new">password-new</router-link>  |
      <router-link to="/123">profile-overview</router-link>  |
      <router-link to="/123/settings">profile-settings</router-link>  |
      <router-link to="/123/skills">profile-skills</router-link>  |
      <router-link to="/scoreboard">scoreboard</router-link>  |
      <router-link to="/design">design</router-link>  |
    </div>
    <router-view/>
  </div>
</template>

<style>
  @import "styles/index.css";
</style>