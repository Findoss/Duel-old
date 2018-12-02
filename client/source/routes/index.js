import Vue from 'vue';
import Router from 'vue-router';

import Signin from '@/views/signin';

Vue.use(Router);


export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      alias: '/signin',
      name: 'signin',
      component: Signin,
    },
  ],
});