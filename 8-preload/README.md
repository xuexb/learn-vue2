# 使用 Vue Router + Vuex 实现 Preload 全局数据

## 思路

在实际项目中，很多页面的数据是重复的，比如一些基础的数据、共同依赖的数据等，而每个页面/组件都去请求自身依赖数据感觉比较低耦合，但实际工作中耦合是避免不了的，这样反而增加了很多数据的请求次数、请求量、处理量，我们使用 [Vuex](https://vuex.vuejs.org/) 来做数据管理，并且以路由为粒度的去配置我们的数据白名单，而这些数据请求完成后会进行 Vuex 存储，别的页面再用时就不用再请求了，我们称之为 Preload 前置数据。

在路由逻辑目录 `src/router/` 中添加 `preload.js` 路由导航守卫，判断根据业务需求在 Vuex `src/store/modules/` 目录中对应模块创建加载数据 Action ，在导航守卫里就可以写：

```js
// 如果有配置且当前数据为空，则加载
if ((preload.userinfo || preload.includes('userinfo')) && Store.state.user.info === null) {
  Store.dispatch('user/PRELOAD_INFO');
}
```

而路由的配置是这样的：

```diff
module.exports = [
  {
    path: '/view/:id/',
    component: () => import(/* webpackChunkName: "page-view" */'@/pages/view/Index.vue'),
    meta: {
      title: 'view.title',
      keywords: 'view.keywords',
      description: 'view.description',
+     preload: 'userinfo',
    },
  },
];
```

## Preload 数据还在请求时页面如何处理

如果是“硬性”数据依赖，如：没有这个数据页面就无法显示，请求的就是列表数据，那么推荐页面显示 Loading 加载中的样式，并且应该使用 `watch immediate` ，因为相同的依赖数据可能在别的页面就被加载完成了，如果单独的使用 `watch` 则不会触发了。

```js
// 错误的，created 时可能数据还没有完成
created() {
  this.init();
},

// 正确的，保证了数据肯定存在时才初始化
// 并且数据可能是在本页面加载，也可能在别的页面加载
computed: {
  userinfo() {
    return this.$store.state.user.info;
  },
},
watch: {
  userinfo: {
    immediate: true,
    handler(data) {
      // 如果有用户数据
      if (data) {
        this.init();
      }
    },
  },
},
```

## 这么耦合真的好么？

本身这些都属于“业务”，而不是一个库、一个高复用的组件，比如 Element UI 的弹出层，肯定不能这么耦合，而自身一个项目，想要达到随便拿一个页面/组件到另一个完全不同的项目中去用，几乎很难做到。比如数据格式是否一致、请求方式等等。
