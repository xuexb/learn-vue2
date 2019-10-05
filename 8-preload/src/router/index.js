/**
 * @file 路由入口文件
 * @description 只是入口配置，具体路由在 @/config/router.js 配置
 */

import Router from 'vue-router';
import rules from '@/config/router';
import { locales } from '@/config/site';
import locale from './locale';
import preload from './preload';

const routes = [];

// 绑定多语言路由
locales.forEach((key) => {
  rules.forEach((item) => {
    routes.push({
      ...item,
      path: `/${key}/${item.path.replace(/^\/+/, '')}`,
      meta: {
        layout: 'Default',
        ...item.meta,
      },
    });
  });
});

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

// 安装导航守卫
const installEach = (context) => {
  if (Array.isArray(context)) {
    context.forEach(item => router.beforeEach(item));
  } else {
    if (Array.isArray(context.beforeEach)) {
      context.beforeEach.forEach(item => router.beforeEach(item));
    }

    if (Array.isArray(context.afterEach)) {
      context.afterEach.forEach(item => router.afterEach(item));
    }
  }
};

installEach(locale);
installEach(preload);

const install = Vue => Vue.use(Router);

export {
  router,
  install,
};
