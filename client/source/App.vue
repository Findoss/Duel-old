<template>
  <div id="app">
    <div id="nav">
      fast navigate
      <router-link to="/">singin</router-link> |
      <router-link to="registration">registration</router-link>  |
      <router-link to="password-reset">password-reset</router-link>  |
      <router-link to="password-new">password-new</router-link>  |
      <router-link to="profile">profile</router-link>  |
      <router-link to="design">design</router-link>  |
    </div>
    <router-view/>
  </div>
</template>

<style>
  @import "styles/index.css";
</style>