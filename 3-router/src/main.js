import Vue from 'vue';
import { router, install as Router } from '@/router/';
import App from './App.vue';

Vue.config.productionTip = false;

Vue.use(Router);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
