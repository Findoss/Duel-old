<template>
  <div id="app">
    <div>statusSocket {{ this.$store.state.statusSocket }}</div>
    <div id="nav">
      fast navigate
      <router-link to="/signin">singin</router-link> |
      <router-link to="/1">profile-overview</router-link>  |
      <router-link to="/design">design</router-link>  |
    </div>
    <router-view/>
  </div>
</template>

<style>
@import "styles/index.css";
</style>