<template>
  <div class="container">
    <div class="paralax"></div>
    <div class="sidebar">
      <z-logo class="sidebar_logo" />
      <z-title
        class="sidebar_title"
        :size="1"
      >
        {{ $t('signInDuel') }}
      </z-title>
      <div class="sidebar_form-signin">
        <z-button>{{ $t('signin')}}</z-button>
      </div>
      <span class="sidebar_new-account">
        {{ $t('registration')}}
        <router-link to="/registration">
          {{ $t('createAccount') }}
        </router-link>
      </span>
    </div>
  </div>
</template>
<script src="./script.js"></script>
<style src="./style.css" scoped></style>