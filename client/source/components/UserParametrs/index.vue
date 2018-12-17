<template>
  <div>
    <table>
      <tbody>
        <td colspan="3">
          <z-title :size="4">Parameters</z-title>
        </td>
        <tr>
          <td>⊠ health</td>
          <td><strong>{{ parameters.health }}</strong></td>
          <td><span class="modificator">{{ parameters.health }}</span></td>
        </tr>
        <tr>
          <td>⊠ force</td>
          <td><strong>{{ parameters.force }}</strong></td>
          <td><span class="modificator">{{ parameters.force }}</span></td>
        </tr>
        <tr>
          <td>⊠ armor</td>
          <td><strong>{{ parameters.armor }}</strong></td>
          <td></td>
        </tr>
        <tr>
          <td>⊠ rage</td>
          <td><strong>{{ parameters.rage }}</strong></td>
          <td></td>
        </tr>
        <tr>
          <td>⊠ healing</td>
          <td><strong>{{ parameters.healing }}</strong></td>
          <td></td>
        </tr>
        <tr>
          <td>⊠ block</td>
          <td><strong>{{ parameters.block }}</strong></td>
          <td></td>
        </tr>
        <td colspan="3">
          <z-title :size="4">Resources</z-title>
        </td>
        <tr>
          <td>⊠ red</td>
          <td><strong>{{ parameters.resources.energy_1 }}</strong></td>
          <td></td>
        </tr>
        <tr>
          <td>⊠ green</td>
          <td><strong>{{ parameters.resources.energy_2 }}</strong></td>
          <td></td>
        </tr>
        <tr>
          <td>⊠ blue</td>
          <td><strong>{{ parameters.resources.energy_3 }}</strong></td>
          <td></td>
        </tr>
      </tbody>
    </table>
    <slot></slot>
  </div>

</template>
<script src="./script.js"></script>
<style src="./style.css" scoped></style>
