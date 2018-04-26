// Core
import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';

// Services
import * as SessionService from '@/services/session';

// Views
import Design from '@/views/design.vue';
import PasswordNew from '@/views/password-new/index.vue';
import PasswordReset from '@/views/password-reset/index.vue';
import Profile from '@/views/profile/index.vue';
import Registration from '@/views/registration/index.vue';
import Signin from '@/views/signin/index.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
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
      meta: { requiresAuthorization: true },
    },
    {
      path: '/design',
      name: 'design',
      component: Design,
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuthorization) && !SessionService.signedIn()) {
    store.commit('newAlert', {
      type: 'error',
      message: 'Please log in to view this page.',
    });
    next({ path: '/' });
  } else {
    next();
  }
});

export default router;
