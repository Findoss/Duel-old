// Core
import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';

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

import Scoreboard from '@/views/scoreboard/scoreboard.vue';

import Design from '@/views/design.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/signin',
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
      path: '/design',
      name: 'design',
      component: Design,
    },
    {
      path: '/scoreboard',
      name: 'scoreboard',
      component: Scoreboard,
    },
    {
      path: '/test',
      name: 'test',
      component: ProfileSetting,
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
          path: 'setting',
          component: ProfileSetting,
        },
        {
          path: 'skills',
          component: ProfileSkills,
        },
        {
          path: 'scoreboard',
          component: Scoreboard,
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuthorization) && !SessionService.signedIn()) {
    store.commit('authorization/showAlert', {
      type: 'error',
      message: 'Please log in to view this page.',
    });
    next({ path: '/signin' });
  } else {
    next();
  }
});

export default router;
