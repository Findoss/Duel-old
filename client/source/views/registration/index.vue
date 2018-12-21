<template>
  <z-container-guest>

    <div class="sidebar_title">
      <z-title :size="1">
        {{ $t('joinDuel') }}
      </z-title>
      {{ $t('createYourPersonalAccount') }}
    </div>

    <form
      accept-charset="UTF-8"
      @submit.prevent="submit"
      @keyup.enter="submit"
      novalidate="true"
      class="sidebar_form"
    >

      <z-block :show="!form.isAvailable" />

      <z-input
        v-model="fields.nickname.value"
        @update="validation($event)"
        :error="fields.nickname.error"
        :status="fields.nickname.status"
        :placeholder="$t('nicknamePlaceholder')"
        autofocus="autofocus"
        name="nickname"
        tabindex="1"
      />

      <z-input
        v-model="fields.email.value"
        @update="validation($event)"
        :error="fields.email.error"
        :status="fields.email.status"
        :placeholder="$t('emailPlaceholder')"
        name="email"
        type="email"
        tabindex="2"
      />

      <z-input
        v-model="fields.password.value"
        @update="validation($event)"
        :error="fields.password.error"
        :status="fields.password.status"
        :placeholder="$t('passwordPlaceholder')"
        name="password"
        type="password"
        tabindex="3"
      />

      <small>
        {{ $t('clickingPrivacyStatement', { btn: $t('createAccount') }) }}
      </small>

      <z-button
        :disabled="!form.isAvailable"
        type="submit"
        tabindex="4"
      >{{ $t('createAccount')}}</z-button>

    </form>

    <span class="sidebar_footer">
      {{ $t('haveAnAccount')}}
      <router-link to="/">
        {{ $t('signIn') }}.
      </router-link>
      <br>
      <router-link :to="{name: 'passwordReset'}">{{ $t('forgotPassword') }}</router-link>
    </span>
  </z-container-guest>
</template>
<script src="./script.js"></script>
<style src="./style.css" scoped></style>