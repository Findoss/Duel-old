// Core
import Vue from 'vue';

import App from './App.vue';
import router from './routes';
import store from './store';
import i18n from './locales';

import './components/globals';

Vue.config.productionTip = process.env.NODE_ENV === 'production';

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app');
