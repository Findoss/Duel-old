<template>
  <div class="profile-navigation">
    <router-link
      class="profile-navigation__item button-icon__skill"
      :to="{ name: 'root'}"
    >
      {{ $t('menu.profile') }}
    </router-link>
    <router-link
      class="profile-navigation__item button-icon__skill"
      :to="{ name: 'skills'}"
    >
      {{ $t('menu.skills') }}
    </router-link>
    <router-link
      class="profile-navigation__item button-icon__skill"
      :to="{ name: 'inventory'}"
    >
      {{ $t('menu.inventory') }}
    </router-link>
    <router-link
      class="profile-navigation__item button-play button-icon__skill"
      :to="{ name: 'root'}"
    >
      {{ $t('menu.play') }}
    </router-link>
    <router-link
      class="profile-navigation__item button-icon__skill"
      :to="{ name: 'shop'}"
    >
      {{ $t('menu.shop') }}
    </router-link>
    <router-link
      class="profile-navigation__item button-icon__skill"
      :to="{ name: 'scoreboard'}"
    >
      {{ $t('menu.scoreboard') }}
    </router-link>
  </div>
</template>
<script src="./script.js"></script>
<style src="./style.css" scoped></style>