<template>
  <div class="notification">
    <transition-group
      name="list"
      tag="div"
    >
      <z-flash-alert
        v-for="(notification, index) in notifications"
        :key="index"
        :icon="!!notification.type"
        :dismissible="true"
        :type="notification.type"
        class="list-alert"
        :autoDelete="3000"
        @close="delNotification(index)"
      >
        {{ notification.message }}
      </z-flash-alert>
    </transition-group>
  </div>
</template>
<script src="./script.js"></script>
<style src="./style.css" scoped></style>
