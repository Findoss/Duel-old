<template>
  <div class="user-parameters">
    <div class="user-parameters_nickname">{{ user.nickname }}</div>
    <div class="user-parameters_hp">{{user.game.health.value}} / {{user.game.health.limit}}</div>
    <div class="user-parameters_resources">
      <div class="resources_energy-1">{{user.game.resources.energy_1}}</div>
      <div class="resources_energy-2">{{user.game.resources.energy_2}}</div>
      <div class="resources_energy-3">{{user.game.resources.energy_3}}</div>
    </div>
  </div>
</template>
<script src="./script.js"></script>
<style src="./style.css" scoped></style>
