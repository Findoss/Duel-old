// Core
import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';

// Services
import * as SessionService from '@/services/session';

// Views
import Design from '@/views/design.vue';
import PasswordNew from '@/views/password-new/password-new.vue';
import PasswordReset from '@/views/password-reset/password-reset.vue';
import Profile from '@/views/profile/profile.vue';
import Registration from '@/views/registration/registration.vue';
import Signin from '@/views/signin/signin.vue';
import Scoreboard from '@/views/scoreboard/scoreboard.vue';

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
      path: '/:userId',
      name: 'profile',
      component: Profile,
      meta: { requiresAuthorization: true },
      children: [
        {
          // при совпадении пути с шаблоном /userId/setting
          path: 'setting',
          component: Profile,
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
    console.log('+++');

    next({ path: '/signin' });
  } else {
    next();
  }
});

export default router;
