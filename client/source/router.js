import Vue from 'vue';
import Router from 'vue-router';

import Profile from '@/views/profile/index.vue';
import Signin from '@/views/signin/index.vue';
import PasswordNew from '@/views/password-new/index.vue';
import Registration from '@/views/registration/index.vue';
import PasswordReset from '@/views/password-reset/index.vue';

import Design from '@/views/design.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'signin',
      component: Signin,
    },
    {
      path: '/registration',
      name: 'registration',
      component: Registration,
    },
    {
      path: '/password-reset',
      name: 'password-reset',
      component: PasswordReset,
    },
    {
      path: '/password-new',
      name: 'password-new',
      component: PasswordNew,
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
    },
    {
      path: '/design',
      name: 'design',
      component: Design,
    },
  ],
});

// https://github.com/vuejs/vue-router/tree/dev/examples/auth-flow
