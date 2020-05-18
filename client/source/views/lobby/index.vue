<template>
  <z-container-center>
    <div class="lobby">
      <z-title
        v-show="time > 0"
        :size="1"
        class="lobby__title"
      >
        {{ time }}
      </z-title>
      <div class="lobby__buttons">
        <z-button
          class="lobby__button_cancel"
          @click="delLobby"
        >
          {{ $t('cancel') }}
        </z-button>
        <z-button
          v-if="time === 0"
          class="lobby__button_continue"
          @click="addLobby"
        >
          {{ $t('continue') }}
        </z-button>
      </div>
    </div>
  </z-container-center>
</template>
<script src="./script.js"></script>
<style src="./style.css" scoped></style>