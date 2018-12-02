<template>
  <button
    :type="type"
    class="classes"
    @click="click($event)"
  >
    <slot></slot>
  </button>
</template>
<script src="./script.js"></script>
<style src="./style.css" scoped></style>