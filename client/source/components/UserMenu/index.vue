
<template>
  <div class="user-menu">
    <div class="user-menu__icon">
    </div>
    <div class="user-menu__nickname">
      <router-link :to="{ name: 'profile'}">
        {{ nickname }}
      </router-link>
    </div>
    <div class="user-menu__estate">
      <div class="user-level">{{ level }}</div>
      <div class="user-gold">{{ estate.gold }}</div>
      <div class="user-diamond">
        {{ estate.diamond}}
        <z-button class="button-buy">{{ $t('buy') }}</z-button>
      </div>
    </div>
  </div>
</template>
<script src="./script.js"></script>
<style src="./style.css" scoped></style>