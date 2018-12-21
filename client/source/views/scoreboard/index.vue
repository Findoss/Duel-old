<template>
  <z-container-profile>
    <div class="scoreboard">
      <z-block :show="!users.length"></z-block>
      <div :class="[ 
        'wrapper-table', 
        'wrapper-table_scroll', 
        !isLogin ? 'wrapper-table_width-all' : '' 
      ]">
        <table class="table">
          <thead>
            <tr class="table__header">
              <th>#</th>
              <th>nickname</th>
              <th>wins</th>
              <th>rank</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(user, index) in users"
              :key="user.id"
              class="table__item"
            >
              <td>
                {{ index }}
              </td>
              <td>
                <router-link :to="{ path: `/${user.id}` }">{{ user.nickname }}</router-link>
              </td>
              <td> {{ user.rank }} </td>
              <td> {{ user.rank }} </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div
        v-if="isLogin"
        class="scoreboard__user-rank"
      >
        <div class="placeholder-slot">placeholder-slot</div>
        <div>{{ user.rank }}</div>
        <div>user.rank-name</div>
        <div>{{ user.nickname }}</div>
      </div>
    </div>
  </z-container-profile>
</template>
<script src="./script.js"></script>
<style src="./style.css" scoped></style>