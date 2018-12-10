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

      <form
        accept-charset="UTF-8"
        @submit.prevent="submit"
        @keyup.enter="submit"
        novalidate="true"
        class="sidebar_form"
      >

        <z-block :show="!form.isAvailable" />

        <z-flash-alert
          v-if="form.error"
          @close="closeAlert()"
          :icon="true"
          :dismissible="true"
          type="error"
        >
          {{ form.error }}
        </z-flash-alert>

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

        <div>
          <z-input
            v-model="fields.password.value"
            @update="validation($event)"
            :error="fields.password.error"
            :status="fields.password.status"
            :placeholder="$t('passwordPlaceholder')"
            :statusIcon="false"
            name="password"
            type="password"
            tabindex="2"
          />
          <div class="form_forgot-password">
            <router-link :to="{name: 'passwordReset'}">{{ $t('forgotPassword') }}</router-link>
          </div>
        </div>

        <z-button
          type="submit"
          tabindex="3"
        >{{ $t('signin')}}</z-button>

        <span class="form_or">{{ $t('or') }}</span>

        <div class="form_socials-networks">
          <img
            tabindex="4"
            src="../../assets/icons/social_networks/fb.png"
            alt="fb"
          >
          <img
            tabindex="5"
            src="../../assets/icons/social_networks/vk.png"
            alt="vk"
          >
          <img
            tabindex="6"
            src="../../assets/icons/social_networks/gh.png"
            alt="gh"
          >
        </div>
      </form>

      <span class="sidebar_footer">
        {{ $t('registration')}}
        <router-link :to="{name: 'registration'}">
          {{ $t('createAccount') }}
        </router-link>
      </span>
    </div>
  </div>
</template>
<script src="./script.js"></script>
<style src="./style.css" scoped></style>