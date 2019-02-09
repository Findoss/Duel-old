<template>
  <div class="game">
    <z-user-parameters
      class="a11"
      :nickname="me.nickname"
    />

    <div class="a2">
      gameId {{ this.$route.params.gameId }} <br />
      stepUser {{ this.stepUser }}

      <z-button @click="surrender">
        surrender
      </z-button>
    </div>

    <z-user-parameters
      class="a33"
      :nickname="opponent.nickname"
    />

    <z-user-avatar
      class="a4"
      :avatar="me.avatar"
    />

    <div class="a5">
      <z-container-board>

        <template v-for="(row, indexaa) in this.$store.state.game.board">
          <div
            v-for="(rune, index) in row"
            :key="String(indexaa +1) + String(index +1)"
            :class="['rune', `rune_type_${rune}` ]"
          >
            {{ rune }}
          </div>
        </template>

      </z-container-board>
    </div>

    <z-user-avatar
      class="a6"
      :avatar="opponent.avatar"
    />

    <z-user-panel class="a7" />
    <z-user-panel class="a8" />
  </div>
</template>
<script src="./script.js"></script>
<style src="./style.css" scoped></style>