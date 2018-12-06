<template>
  <div class="container">
    <div class="paralax"></div>
    <div class="sidebar">
      <z-logo class="sidebar_logo" />

      <z-title
        :size="2"
        class="sidebar_title"
      >
        {{ $t('changePassword') }}
      </z-title>

      <form
        accept-charset="UTF-8"
        @submit.prevent="submit"
        @keyup.enter="submit"
        novalidate="true"
        class="sidebar_form"
      >

        <z-input
          :validationRules="form.password.rules"
          @validation="form.password.status = $event"
          :placeholder="`${$t('new')} ${$t('password').toLowerCase()}`"
          name="password"
          ref="password"
          tabindex="1"
          type="password"
          v-model="form.password.value"
        />

        <z-input
          :validationRules="form.confirmPassword.rules"
          @validation="form.confirmPassword.status = $event"
          :placeholder="`${$t('confirm')} ${$t('password').toLowerCase()}`"
          name="confirmPassword"
          ref="confirmPassword"
          tabindex="2"
          type="password"
          v-model="form.confirmPassword.value"
        />

        <z-button
          tabindex="3"
          type="submit"
        >{{ $t('changePassword') }}</z-button>

      </form>

      <span class="sidebar_footer">
        {{ $t('anyProblems')}}
        <router-link to="#">
          {{ $t('support') }}.
        </router-link>
      </span>
    </div>
  </div>
</template>
<script src="./script.js"></script>
<style src="./style.css" scoped></style>