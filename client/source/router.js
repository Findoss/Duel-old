import Vue from 'vue';
import Router from 'vue-router';
import Signin from '@/views/signin/index.vue';
import Registration from '@/views/registration/index.vue';
import Profile from '@/views/profile.vue';
import Design from '@/views/design.vue';

Vue.use(Router);

export default new Router({
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
