<template>
  <div class="container">
    <div class="paralax"></div>
    <div class="sidebar">
      <z-logo class="sidebar_logo" />
      <z-title
        class="sidebar_title"
        :size="2"
      >
        {{ $t('passwordReset') }}
      </z-title>

      <form
        accept-charset="UTF-8"
        @submit.prevent="submit"
        @keyup.enter="submit"
        novalidate="true"
        class="sidebar_form"
        v-show="!isSendResetPassword"
      >

        <small>
          {{ $t('yourEmail') }}
        </small>
        <z-input
          :icon="false"
          :validationRules="form.email.rules"
          @validation="form.email.status = $event"
          autofocus="autofocus"
          name="email"
          placeholder="Enter your email address"
          ref="email"
          tabindex="1"
          type="email"
          v-model="form.email.value"
        />

        <z-button
          tabindex="2"
          type="submit"
        >{{ $t('sendPasswordReset') }}</z-button>

      </form>

      <div
        class="sidebar_success"
        v-show="isSendResetPassword"
      >
        <p>{{ $t('sendResetPassword') }}</p>
        <br>
        <z-button @click="goSignin()">{{ $t('returnSignIn') }}</z-button>

      </div>

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