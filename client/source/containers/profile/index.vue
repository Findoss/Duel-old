<template>
  <div class="profile-container">
    <z-profile-header
      v-if="isLogin"
      class="profile-container__header"
    />

    <router-link
      v-else
      :to="{ name: `root` }"
      class="profile-container__header"
    >
      {{ $t('signIn') }}
    </router-link>

    <div class="profile-container__content">
      <slot></slot>
    </div>

  </div>
</template>
<script src="./script.js"></script>
<style src="./style.css" scoped></style>