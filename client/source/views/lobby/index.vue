<template>
  <div class="lobby_conteiner">
    <div class="lobby">

      <z-title
        :size="1"
        class="lobby__title"
      >
        {{ time }}
      </z-title>
      <z-button
        class="lobby__button_cancel"
        @click="delLobby"
      >
        {{ $t('cancel') }}
      </z-button>
    </div>
  </div>
</template>
<script src="./script.js"></script>
<style src="./style.css" scoped></style>