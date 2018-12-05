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

        <z-input
          :validationIcon="false"
          :validationRules="form.email.rules"
          @validation="form.email.status = $event"
          autofocus="autofocus"
          name="email"
          placeholder="email@email.com"
          ref="email"
          tabindex="1"
          type="email"
          v-model="form.email.value"
        />

        <div>
          <z-input
            :validationIcon="false"
            :validationRules="form.password.rules"
            @validation="form.password.status = $event"
            name="password"
            placeholder="your password"
            ref="password"
            tabindex="2"
            type="password"
            v-model="form.password.value"
          />
          <div class="form_forgot-password">
            <router-link :to="{name: 'passwordReset'}">{{ $t('forgotPassword') }}</router-link>
          </div>
        </div>

        <z-button
          tabindex="3"
          type="submit"
        >{{ $t('signin')}}</z-button>

        <span class="form_or">{{ $t('or') }}</span>

        <div class="form_socials-networks">
          <img
            src="../../assets/icons/social_networks/fb.png"
            alt="fb"
          >
          <img
            src="../../assets/icons/social_networks/vk.png"
            alt="vk"
          >
          <img
            src="../../assets/icons/social_networks/gh.png"
            alt="gh"
          >
        </div>
      </form>

      <span class="sidebar_footer">
        {{ $t('registration')}}
        <router-link :to="{name: 'passwordReset'}">
          {{ $t('createAccount') }}
        </router-link>
      </span>
    </div>
  </div>
</template>
<script src="./script.js"></script>
<style src="./style.css" scoped></style>