import Vue from 'vue';

import app from './app.vue';
import router from './routes';
import store from './store';
import i18n from './locales';

import './components/globals';

import './utils/http';
import { socketAuth } from './utils/socket';

Vue.config.productionTip = process.env.NODE_ENV === 'production';

new Vue({
  router,
  store,
  i18n,
  render: h => h(app),
}).$mount('#app');

socketAuth();
