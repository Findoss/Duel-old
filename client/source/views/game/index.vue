<template>
  <div class="game">
    <z-user-parameters
      class="me-parameters"
      :user="me"
    />

    <div class="step-panel">
      <div class="time-step">
        {{ currentStepTime }} {{ isMyStep ? $t('game.youStep'):$t('game.opponentStep') }}
        <z-button @click="surrender">
          surrender
        </z-button>
      </div>

    </div>

    <z-user-parameters
      class="opponent-parameters"
      :user="opponent"
    />

    <z-user-avatar
      class="me-avatar"
      :avatar="me.avatar"
    />

    <div class="board">
      <z-board-container>
        <z-block
          :show="!isMyStep"
          :icon="false"
          :border="false"
          :cursor="''"
          :opacity="3"
        />

        <template v-for="(row, indexaa) in $store.state.game.board">
          <div
            v-for="(rune, index) in row"
            :key="String(indexaa +1) + String(index +1)"
            :class="['rune', `rune_type_${rune}` ]"
            @click="fakeAction"
          >
            {{ rune }}
          </div>
        </template>

      </z-board-container>
    </div>

    <z-user-avatar
      class="opponent-avatar"
      :avatar="opponent.avatar"
    />
    <div class="me-panel">
      <z-block
        :show="!isMyStep"
        :icon="false"
        :border="false"
        :cursor="''"
        :opacity="3"
      />
      <z-user-panel />
    </div>

    <div class="opponent-panel">
      <z-user-panel />
    </div>
  </div>
</template>
<script src="./script.js"></script>
<style src="./style.css" scoped></style>