<template>
  <div class="container">
    <div class="paralax"></div>
    <div class="sidebar">

      <z-logo class="sidebar_logo" />

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

        <z-input
          :validationRules="form.nickname.rules"
          v-model="form.nickname.value"
          @validation="form.nickname.status = $event"
          :placeholder="$t('nicknamePlaceholder')"
          autofocus="autofocus"
          name="nickname"
          ref="nickname"
          tabindex="1"
        />

        <z-input
          :validationRules="form.email.rules"
          v-model="form.email.value"
          @validation="form.email.status = $event"
          :placeholder="$t('emailPlaceholder')"
          name="email"
          ref="email"
          tabindex="2"
          type="email"
        />

        <z-input
          :validationRules="form.password.rules"
          v-model="form.password.value"
          @validation="form.password.status = $event"
          :placeholder="$t('passwordPlaceholder')"
          name="password"
          ref="password"
          tabindex="3"
          type="password"
        />

        <small>
          {{ $t('clickingPrivacyStatement', { btn: $t('createAccount') }) }}
        </small>
        <z-button
          tabindex="4"
          type="submit"
        >{{ $t('createAccount')}}</z-button>
      </form>

      <span class="sidebar_footer">
        {{ $t('haveAnAccount')}}
        <router-link to="/">
          {{ $t('signin') }}.
        </router-link>
        <br>
        <router-link :to="{name: 'passwordReset'}">{{ $t('forgotPassword') }}</router-link>
      </span>
    </div>
  </div>
</template>
<script src="./script.js"></script>
<style src="./style.css" scoped></style>