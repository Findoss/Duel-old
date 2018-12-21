<template>
  <div class="user-menu">
    <div class="user-menu__nickname">
      <router-link :to="{ path: `/${this.$store.getters.myId}` }">
        {{ user.nickname }}
      </router-link>
    </div>
    <div class="user-menu__estate">
      <div class="user-level">{{ user.level }}</div>
      <div class="user-gold">{{ user.private.gold }}</div>
      <div class="user-diamond">
        {{ user.private.diamond }}
        <z-button class="button-buy">{{ $t('buy') }}</z-button>
      </div>
    </div>
    <div
      class="user-menu__navigation"
      @click="showMenu"
    >
      <div
        class="user-menu__navigation__list"
        v-show="isShowMenu"
      >
        <router-link
          class="navigation-item"
          :to="{ name: 'settings'}"
        >
          {{ $t('help') }}
        </router-link>
        <router-link
          class="navigation-item"
          :to="{ name: 'settings'}"
        >
          {{ $t('settings') }}
        </router-link>
        <z-button
          @click="toggleFullscreen"
          class="navigation-item"
        >
          {{ $t('fullscreen') }}
        </z-button>
        <br>
        <z-button
          class="navigation-item"
          @click="signOut()"
        >
          {{ $t('signOut') }}
        </z-button>
      </div>
    </div>
  </div>
</template>
<script src="./script.js"></script>
<style src="./style.css" scoped></style>