<template>
  <z-container-center>
    <div class="game-end">
      game-end
      <router-link :to="{ name: 'profile', params: { userId: this.$store.getters.myId, force: true } }">
        profile
      </router-link>
      <router-link :to="{ name: 'lobby', params: { force: true } }">
        play more
      </router-link>
    </div>
  </z-container-center>
</template>
<script src="./script.js"></script>
<style src="./style.css" scoped></style>