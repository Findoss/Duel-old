
<template>
  <div class="user-avatar">
    <button
      @click="showParametrs"
      class="user-avatar__toggle"
    ></button>
    <div class="user-avatar__nickname">
      {{ nickname }}
    </div>
    <z-image
      v-show="!isShowParametrs"
      :src="pathAvatar(avatar)"
      alt="avatar"
      class="user-avatar__image"
    />
    <z-user-parametrs
      v-show="isShowParametrs"
      :parameters="parameters"
      class="user-avatar__parametrs"
    />
  </div>
</template>
<script src="./script.js"></script>
<style src="./style.css" scoped></style>