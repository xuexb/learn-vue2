/**
 * @file 路由入口文件
 * @description 只是入口配置，具体路由在 @/config/router.js 配置
 */

import Router from 'vue-router';
import routes from '@/config/router';

const router = new Router({
  mode: 'history',
  routes,
  fallback: false,
  scrollBehavior(to, from, savedPosition) {
    // 锚点定位
    if (to.hash) {
      return {
        selector: to.hash,
      };
    }

    return savedPosition || { x: 0, y: 0 };
  },
});

const install = Vue => Vue.use(Router);

export {
  router,
  install,
};
