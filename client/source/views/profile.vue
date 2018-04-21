<template>
  <div class="card">
    <h1 class="name">{{ name }}</h1>
    <p>Email {{ email }}</p>
    <p>Password {{ password }}</p>
  </div>
</template>


<script>
  export default {
  data: function () {
    return {
      name: '0000',
      email: '0000@000.000',
      password: '0000'
    }
  },
}
</script>