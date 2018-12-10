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
        v-if="!form.isSuccessSend"
        accept-charset="UTF-8"
        @submit.prevent="submit"
        @keyup.enter="submit"
        novalidate="true"
        class="sidebar_form"
      >

        <z-block :show="!form.isAvailable" />

        <small>
          {{ $t('yourEmail') }}
        </small>
        <z-input
          v-model="fields.email.value"
          @update="validation($event)"
          :error="fields.email.error"
          :status="fields.email.status"
          :placeholder="$t('emailPlaceholder')"
          :statusIcon="false"
          autofocus="autofocus"
          name="email"
          type="email"
          tabindex="1"
        />

        <z-button
          :disabled="!form.isAvailable"
          :class="{'base-button_wait' : !form.isAvailable}"
          type="submit"
          tabindex="2"
        >{{ $t('sendPasswordReset') }}</z-button>

      </form>

      <div
        v-else
        class="sidebar_success"
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