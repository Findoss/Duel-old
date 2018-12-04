<template>
  <div class="base-input-group">
    <label
      v-if="label"
      for="name"
    >{{ label }}</label>
    <input
      :id="name"
      :name="name"
      :type="type"
      :class="classes"
      :value="value"
      @input="updateField($event.target.value)"
      v-bind="$attrs"
    >
    <p
      v-if="error"
      class="base-input-group__error"
    >{{ $t(`form.errors[${error}]`) }}</p>
  </div>
</template>
<script src="./script.js"></script>
<style src="./style.css" scoped></style>