<template>

  <div class="game">

    <z-title :size="1">
      gameId: {{ this.$route.params.gameId }}
    </z-title>
    <z-button @click="send">
      send action
    </z-button>

  </div>
</template>
<script src="./script.js"></script>
<style src="./style.css" scoped></style>