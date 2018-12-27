import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store/index';

import Signin from '@/views/signin';
import Registration from '@/views/registration';
import PasswordReset from '@/views/password_reset';
import passwordNew from '@/views/password_new';
import ProfileOverview from '@/views/profile_overview';
import ProfileSkills from '@/views/profile_skills';
import ProfileInventory from '@/views/profile_inventory';
import ProfileSettings from '@/views/profile_settings';
import Scoreboard from '@/views/scoreboard';
import Lobby from '@/views/lobby';
import Game from '@/views/game';
import GameEnd from '@/views/game_end';


Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      alias: '/signin',
      name: 'root',
      meta: { isGoProfile: true },
      component: Signin,
    },
    {
      path: '/registration',
      name: 'registration',
      meta: { isGoProfile: true },
      component: Registration,
    },
    {
      path: '/password-reset',
      name: 'passwordReset',
      meta: { isGoProfile: true },
      component: PasswordReset,
    },
    {
      path: '/password-new/:hash',
      name: 'passwordNew',
      meta: { isGoProfile: true },
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
      path: '/scoreboard',
      name: 'scoreboard',
      meta: { isPrivate: false },
      component: Scoreboard,
    },
    {
      path: '/game',
      name: 'lobby',
      component: Lobby,
    },
    {
      path: '/game-end',
      name: 'gameEnd',
      component: GameEnd,
    },
    {
      path: '/game/:gameId',
      name: 'game',
      component: Game,
    },
    {
      path: '/:userId',
      name: 'profile',
      meta: { isPrivate: false },
      component: ProfileOverview,
    },
  ],
});

router.beforeEach((to, from, next) => {
  /**
   * isPrivate
   * TRUE - страница требует авторизации
   * FALSE - страница не требует авторизации
   */
  /**
   * isGoProfile
   * TRUE - требует перейти на страницу профиля
   * isGoProfile && isLogin
   * TRUE - требует перейти на страницу профиля если пользователь авторизован
   */
  /**
   * isLogin
   * TRUE - пользователь авторизован
   * FALSE - пользователь не авторизован
   */
  const isPrivate = to.matched.some(r => r.meta.isPrivate);
  const isGoProfile = to.matched.some(r => r.meta.isGoProfile);

  const { myId, isLogin } = store.getters;

  if (isPrivate === isLogin) {
    next();
  } else {
    if (isPrivate && !isLogin) {
      next({ name: 'root' });
    }
    if (isGoProfile && isLogin) {
      next({ name: 'profile', params: { userId: myId } });
    }
  }

  next();
});


export default router;