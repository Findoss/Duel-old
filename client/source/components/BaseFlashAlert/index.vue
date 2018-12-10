<template>

  <div :class="classes">
    <slot></slot>
    <button
      type="button"
      v-if="dismissible"
      class="button-close"
      @click="close()"
    ></button>
  </div>

</template>
<script src="./script.js"></script>
<style src="./style.css" scoped></style>