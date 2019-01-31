<template>
  <div>
    <table>
      <tbody>
        <td colspan="3">
          <z-title :size="4">attributes</z-title>
        </td>
        <tr>
          <td>⊠ health</td>
          <td><strong>{{ attributes.health }}</strong></td>
          <td><span class="modificator">{{ attributes.health }}</span></td>
        </tr>
        <tr>
          <td>⊠ force</td>
          <td><strong>{{ attributes.force }}</strong></td>
          <td><span class="modificator">{{ attributes.force }}</span></td>
        </tr>
        <tr>
          <td>⊠ armor</td>
          <td><strong>{{ attributes.armor }}</strong></td>
          <td></td>
        </tr>
        <tr>
          <td>⊠ rage</td>
          <td><strong>{{ attributes.rage }}</strong></td>
          <td></td>
        </tr>
        <tr>
          <td>⊠ healing</td>
          <td><strong>{{ attributes.healing }}</strong></td>
          <td></td>
        </tr>
        <tr>
          <td>⊠ block</td>
          <td><strong>{{ attributes.block }}</strong></td>
          <td></td>
        </tr>
        <td colspan="3">
          <z-title :size="4">Resources</z-title>
        </td>
        <tr>
          <td>⊠ red</td>
          <td><strong>{{ attributes.resources.energy_1 }}</strong></td>
          <td></td>
        </tr>
        <tr>
          <td>⊠ green</td>
          <td><strong>{{ attributes.resources.energy_2 }}</strong></td>
          <td></td>
        </tr>
        <tr>
          <td>⊠ blue</td>
          <td><strong>{{ attributes.resources.energy_3 }}</strong></td>
          <td></td>
        </tr>
      </tbody>
    </table>
    <slot></slot>
  </div>

</template>
<script src="./script.js"></script>
<style src="./style.css" scoped></style>
