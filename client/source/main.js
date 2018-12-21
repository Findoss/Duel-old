import Vue from 'vue';

import './utils/http';
import './utils/socket';
import './components/globals';

import app from './app.vue';
import router from './routes';
import store from './store';
import i18n from './locales';


Vue.config.productionTip = process.env.NODE_ENV === 'production';

new Vue({
  router,
  store,
  i18n,
  render: h => h(app),
}).$mount('#app');
