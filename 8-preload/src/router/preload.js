/**
 * @file 根据路由配置提前加载加载数据，配合 vuex 处理，在组件页面中 watch 监听
 */

import Store from '@/store/';

export default [
  (to, from, next) => {
    // 如果路由配置中有前置数据
    if (!to.meta || !to.meta.preload) {
      return next();
    }

    const { preload } = to.meta;

    // 如果有配置且当前数据为空，则加载
    if ((preload.userinfo || preload.includes('userinfo')) && Store.state.user.info === null) {
      Store.dispatch('user/PRELOAD_INFO');
    }

    return next();
  },
];
