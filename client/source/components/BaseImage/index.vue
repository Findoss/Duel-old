<template>
  <div class="img_wrapper">
    <div
      v-show="loading"
      class="spin"
    />
    <img
      v-show="!loading"
      :src="src"
      @load="onload"
      class="img"
    />
  </div>
</template>
<script src="./script.js"></script>
<style src="./style.css"></style>