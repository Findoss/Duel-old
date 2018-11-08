// Core
import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store/index';

// Services
import * as sessionService from '@/services/session';

// Views
import Registration from '@/views/registration/registration.vue';
import Signin from '@/views/signin/signin.vue';
import PasswordReset from '@/views/password-reset/password-reset.vue';
import PasswordNew from '@/views/password-new/password-new.vue';

import ProfileOverview from '@/views/profile-overview/profile-overview.vue';
import Chat from '@/views/profile-chat/profile-chat.vue';
import Shop from '@/views/profile-shop/profile-shop.vue';
import Skills from '@/views/profile-skills/profile-skills.vue';
import Settings from '@/views/profile-setting/profile-setting.vue';
import Scoreboard from '@/views/profile-scoreboard/profile-scoreboard.vue';

// import Game from '@/views/game/game.vue';
// import Design from '@/views/design.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      alias: '/signin',
      name: 'signin',
      meta: { goProfile: true },
      component: Signin,
    },
    {
      path: '/passwordReset',
      name: 'passwordReset',
      meta: { goProfile: true },
      component: PasswordReset,
    },
    {
      path: '/passwordNew',
      name: 'passwordNew',
      meta: { goProfile: true },
      component: PasswordNew,
    },
    {
      path: '/registration',
      name: 'registration',
      meta: { goProfile: true },
      component: Registration,
    },
    {
      path: '/settings',
      name: 'settings',
      meta: { requiresAuthorization: true },
      component: Settings,
      // children: [
      //   {
      //     path: '',
      //     component: Settings,
      //   },
      // ],
    },
    {
      path: '/shop',
      name: 'shop',
      meta: { requiresAuthorization: true },
      component: Shop,
    },
    {
      path: '/skills',
      name: 'skills',
      meta: { requiresAuthorization: true },
      component: Skills,
    },
    {
      path: '/scoreboard',
      name: 'scoreboard',
      meta: { requiresAuthorization: true },
      component: Scoreboard,
    },
    {
      path: '/chat',
      name: 'chat',
      meta: { requiresAuthorization: true },
      component: Chat,
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

  if (requiresAuthorization && !sessionService.isLogin()) {
    store.dispatch('me/account/showAlertSignin', {
      type: 'error',
      message: 'Please login to view this page.',
    });
    next({ path: '/signin' });
  }

  if (goProfile && sessionService.isLogin()) {
    next({ path: `/${store.getters.myId}` });
  }

  next();
});

export default router;
