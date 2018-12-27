<template>
  <div class="game">
    <div class="a1">hp me</div>
    <div class="a2">timer</div>
    <div class="a3">hp ooponent</div>
    <div class="a4">me avatar</div>
    <div class="a5">board

      <z-title :size="1">
        gameId: {{ this.$route.params.gameId }}
      </z-title>
      <z-button>
        <router-link :to="{ name: `gameEnd`, params: {force: true} } ">
          game end
        </router-link>
      </z-button>
    </div>
    <div class="a6">opponent avatar</div>
    <div class="a7">me panel</div>
    <div class="a8">opponent panel</div>
  </div>
</template>
<script src="./script.js"></script>
<style src="./style.css" scoped></style>