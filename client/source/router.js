// Core
import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store/index';

// Services
import * as SessionService from '@/services/session';

// Views
import Registration from '@/views/registration/registration.vue';
import Signin from '@/views/signin/signin.vue';
import PasswordReset from '@/views/password-reset/password-reset.vue';
import PasswordNew from '@/views/password-new/password-new.vue';

import Profile from '@/views/profile/profile.vue';
import ProfileOverview from '@/views/profile-overview/profile-overview.vue';
import ProfileSkills from '@/views/profile-skills/profile-skills.vue';
import ProfileSetting from '@/views/profile-setting/profile-setting.vue';
import ProfileScoreboard from '@/views/profile-scoreboard/profile-scoreboard.vue';

import Design from '@/views/design.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/signin',
      name: 'signin',
      component: Signin,
      meta: { goProfile: true },
    },
    {
      path: '/registration',
      name: 'registration',
      component: Registration,
      meta: { goProfile: true },
    },
    {
      path: '/password-reset',
      name: 'password-reset',
      component: PasswordReset,
      meta: { goProfile: true },
    },
    {
      path: '/password-new',
      name: 'password-new',
      component: PasswordNew,
      meta: { goProfile: true },
    },
    {
      path: '/design',
      name: 'design',
      component: Design,
    },
    {
      path: '/:userId',
      component: Profile,
      meta: { requiresAuthorization: true },
      children: [
        {
          path: '',
          component: ProfileOverview,
        },
        {
          path: 'settings',
          component: ProfileSetting,
        },
        {
          path: 'skills',
          component: ProfileSkills,
        },
        {
          path: 'scoreboard',
          component: ProfileScoreboard,
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  const requiresAuthorization = to.matched.some(r => r.meta.requiresAuthorization);
  const goProfile = to.matched.some(r => r.meta.goProfile);

  if (requiresAuthorization && !SessionService.isLogin()) {
    store.dispatch('me/account/showAlertSignin', {
      type: 'error',
      message: 'Please login to view this page.',
    });
    next({ path: '/signin' });
    return false;
  }

  if (goProfile && SessionService.isLogin()) {
    next({ path: `/${store.getters.myId}` });
    return false;
  }

  next();
});

export default router;
