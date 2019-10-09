import Vue from 'vue';
import Meta from 'vue-meta';
import { router, install as Router } from '@/router/';
import { install as Service } from '@/utils/service';
import store from '@/store/';
import { i18n } from '@/locales/';
import App from './App.vue';

Vue.config.productionTip = false;

Vue.use(Router);
Vue.use(Meta);
Vue.use(Service);

new Vue({
  i18n,
  router,
  store,
  render: h => h(App),
}).$mount('#app');
