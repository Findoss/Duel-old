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
import ProfileSkills from '@/views/profile_skills';
import ProfileInventory from '@/views/profile_inventory';
import ProfileSettings from '@/views/profile_settings';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      alias: '/signin',
      name: 'root',
      meta: { isPrivate: false },
      component: Signin,
    },
    {
      path: '/registration',
      name: 'registration',
      meta: { isPrivate: false },
      component: Registration,
    },
    {
      path: '/password-reset',
      name: 'passwordReset',
      meta: { isPrivate: false },
      component: PasswordReset,
    },
    {
      path: '/password-new/:hash',
      name: 'passwordNew',
      meta: { isPrivate: false },
      component: passwordNew,
    },
    {
      path: '/skills',
      name: 'skills',
      meta: { isPrivate: true },
      component: ProfileSkills,
    },
    {
      path: '/inventory',
      name: 'inventory',
      meta: { isPrivate: true },
      component: ProfileInventory,
    },
    {
      path: '/settings',
      name: 'settings',
      meta: { isPrivate: true },
      component: ProfileSettings,
    },
    {
      path: '/:userId',
      name: 'profile',
      meta: { isPrivate: true },
      component: ProfileOverview,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const isPrivate = to.matched.some(r => r.meta.isPrivate);

  if (isPrivate === sessionService.isLogin()) {
    next();
  } else {
    if (isPrivate && !sessionService.isLogin()) {
      next({ name: 'root' });
    }
    if (!isPrivate && sessionService.isLogin()) {
      next({ path: `/${store.getters.myId}` });
    }
  }

  next();
});

export default router;