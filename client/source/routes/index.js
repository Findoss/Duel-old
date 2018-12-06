import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store/index';

// Services
import * as sessionService from '@/services/session';

import Signin from '@/views/signin';
import Registration from '@/views/registration';
import PasswordReset from '@/views/password_reset';
import passwordNew from '@/views/password_new';
import ProfileOverview from '@/views/profile_overview';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '',
      alias: '/signin',
      name: 'root',
      meta: { goProfile: true },
      component: Signin,
    },
    {
      path: '/registration',
      name: 'registration',
      meta: { goProfile: true },
      component: Registration,
    },
    {
      path: '/password-reset',
      name: 'passwordReset',
      meta: { goProfile: true },
      component: PasswordReset,
    },
    {
      path: '/password-new/:hash',
      name: 'passwordNew',
      meta: { goProfile: true },
      component: passwordNew,
    },
    {
      path: '/:userId',
      name: 'profile',
      meta: { requiresAuthorization: true },
      component: ProfileOverview,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const requiresAuthorization = to.matched.some(r => r.meta.requiresAuthorization);
  const goProfile = to.matched.some(r => r.meta.goProfile);

  /**
   * TODO описане
  */
  if (requiresAuthorization && !sessionService.isLogin()) {
    next({ name: 'root' });
  }

  /**
   * TODO описане
  */
  if (goProfile && sessionService.isLogin()) {
    next({ path: `/${store.getters.myId}` });
  }

  next();
});

export default router;