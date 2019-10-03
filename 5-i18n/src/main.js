import Vue from 'vue';
import { router, install as Router } from '@/router/';
import store from '@/store/';
import { i18n } from '@/locales/';
import App from './App.vue';

Vue.config.productionTip = false;

Vue.use(Router);

new Vue({
  i18n,
  router,
  store,
  render: h => h(App),
}).$mount('#app');
