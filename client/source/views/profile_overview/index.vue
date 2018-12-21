<template>
  <z-container-profile>
    <div class="profile-overview">
      <z-block :show="pending" />
      <z-user-avatar
        :avatar="user.avatar"
        :nickname="user.nickname"
        class="profile-overview__user-avatar"
      />
      <z-user-statistics class="profile-overview__user-statistics" />
      <z-user-panel class="profile-overview__user-panel" />
      <z-user-match-history class="profile-overview__user-match-history" />
    </div>
  </z-container-profile>
</template>
<script src="./script.js"></script>
<style src="./style.css" scoped></style>