<template>
  <div class="notification">
    <transition-group
      name="list"
      tag="div"
    >
      <z-flash-alert
        v-for="(notification) in notifications"
        @close="delNotification(notification.key)"
        :key="notification.key"
        :icon="!!notification.type"
        :dismissible="true"
        :type="notification.type"
        :autoDelete="3000"
        class="list-alert"
      >
        {{ notification.message }}
      </z-flash-alert>
    </transition-group>
  </div>
</template>
<script src="./script.js"></script>
<style src="./style.css" scoped></style>
