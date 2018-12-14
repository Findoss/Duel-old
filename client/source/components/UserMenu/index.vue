
<template>
  <div class="user-menu">
    <div
      class="user-menu__navigation"
      @click="toggleMenu"
    >
      <div
        class="user-menu__navigation__list"
        v-show="showMenu"
      >
        <router-link
          class="navigation-item"
          :to="{ name: 'settings'}"
        >
          {{ $t('settings') }}
        </router-link>
        <z-button
          class="navigation-item"
          @click="signOut()"
        >{{ $t('signOut') }}</z-button>
      </div>
    </div>
    <div class="user-menu__nickname">
      <router-link :to="{ name: 'profile'}">
        {{ userData.nickname }}
      </router-link>
    </div>
    <div class="user-menu__estate">
      <div class="user-level">{{ userData.level }}</div>
      <div class="user-gold">{{ userData.private.gold }}</div>
      <div class="user-diamond">
        {{ userData.private.diamond }}
        <z-button class="button-buy">{{ $t('buy') }}</z-button>
      </div>
    </div>
  </div>
</template>
<script src="./script.js"></script>
<style src="./style.css" scoped></style>