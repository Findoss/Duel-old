<template>
  <div class="profile-container">
    <z-profile-header class="profile-container__header" />
    <div class="profile-container__content">
      <z-button @click="signOut()">sign out</z-button>
      <z-button @click="privateSend()">private click</z-button>
      <pre v-html="userData"></pre>
    </div>
  </div>

</template>
<script src="./script.js"></script>
<style src="./style.css" scoped></style>