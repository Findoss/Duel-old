
<template>
  <div class="user-avatar">
    <button
      @click="showAttributes"
      class="user-avatar__toggle"
    ></button>
    <div class="user-avatar__nickname">
      {{ nickname }}
    </div>
    <z-image
      v-show="!isShowAttributes"
      :src="pathAvatar(avatar)"
      alt="avatar"
      class="user-avatar__image"
    />
    <z-user-attributes
      v-show="isShowAttributes"
      :attributes="attributes"
      class="user-avatar__attributes"
    />
  </div>
</template>
<script src="./script.js"></script>
<style src="./style.css" scoped></style>