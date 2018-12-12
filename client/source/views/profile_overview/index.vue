<template>
  <z-container-profile>
    <z-button @click="signOut()">sign out</z-button>
    <z-button @click="privateSend()">private click</z-button>
    <pre v-html="userData"></pre>
  </z-container-profile>
</template>
<script src="./script.js"></script>
<style src="./style.css" scoped></style>