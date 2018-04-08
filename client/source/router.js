import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/login.vue';
import Registration from './views/registration.vue';
import Profile from './views/profile.vue';
import Design from './views/design.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
    },
    {
      path: '/registration',
      name: 'registration',
      component: Registration,
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
