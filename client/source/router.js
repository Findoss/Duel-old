import Vue from 'vue';
import Router from 'vue-router';

import SessionService from '@/services/session-service';

import Profile from '@/views/profile/index.vue';
import Signin from '@/views/signin/index.vue';
import PasswordNew from '@/views/password-new/index.vue';
import Registration from '@/views/registration/index.vue';
import PasswordReset from '@/views/password-reset/index.vue';

import Design from '@/views/design.vue';

Vue.use(Router);

const router = new Router({
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
    next({ path: '/' });
  } else {
    next();
  }
});

export default router;
