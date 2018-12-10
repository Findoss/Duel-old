<template>
  <div class="container">
    <div class="paralax"></div>
    <div class="sidebar">
      <z-logo class="sidebar_logo" />

      <z-title
        :size="2"
        class="sidebar_title"
      >
        {{ $t('changePassword') }} {{ $t('for') }}
        <br>
        {{ nickname }}
      </z-title>

      <form
        v-if="isValidLink"
        accept-charset="UTF-8"
        @submit.prevent="submit"
        @keyup.enter="submit"
        novalidate="true"
        class="sidebar_form"
      >

        <z-block :show="form.isAvailable" />

        <z-flash-alert
          v-if="form.error"
          :icon="true"
          :autoDelete="0"
          type="error"
        >
          {{ form.error }}
        </z-flash-alert>

        <z-input
          v-model="fields.password.value"
          @update="validation($event)"
          :error="fields.password.error"
          :status="fields.password.status"
          :placeholder="`${$t('new')} ${$t('password').toLowerCase()}`"
          name="password"
          type="password"
          tabindex="1"
        />

        <z-input
          v-model="fields.confirmPassword.value"
          @update="validation($event)"
          :error="fields.confirmPassword.error"
          :status="fields.confirmPassword.status"
          :placeholder="`${$t('confirm')} ${$t('password').toLowerCase()}`"
          name="confirmPassword"
          type="password"
          tabindex="2"
        />

        <z-button
          :disabled="!form.isAvailable"
          :class="{'base-button_wait' : !form.isAvailable}"
          type="submit"
          tabindex="3"
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