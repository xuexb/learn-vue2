# 使用 Layout

## 由来

在项目开发中，我们的页面肯定是有公用的一些部分，如：头部、底部，这种情况下通常我们是在主模板 `App.vue` 中引用公用组件，并使用 `<router-view>` 加载路由页面，代码如：

```html
<template>
  <div>
    <my-header />
    <router-view />
    <my-footer />
  </div>
</template>
```

但随着项目越来越大，页面越来越多，需求层出不穷，我们常常接到这样的需求：

- 主页布局是全屏的
- 详情页是固定宽度
- 搜索页是私有的头部
- ...

如果全在 `App.vue` 中引用公用组件，那么整个页面逻辑就会很庞大，并且会有一些 `if` 条件判断。

结合这些需求和 [Vue.js 动态组件](https://cn.vuejs.org/v2/guide/components.html#%E5%8A%A8%E6%80%81%E7%BB%84%E4%BB%B6) 特性，我们把这些功能拆分并聚合成统一类型的组件，我们叫她 Layout 。

## 目录规范
        
```
src
├── components
│   ├── Footer.vue
│   └── Header.vue
└── layouts                     - Layout 目录
    ├── Default.vue             - 默认布局
    └── FullWidth.vue           - 全屏撑满布局
```

## 使用

我们在 `src/layouts/` 中定义 Layout 主模板，并在 `src/App.vue` 中引用，因为所有的主布局都是以路由为粒度，所以在 `src/config/router.js` 中路由里添加一个 `meta.layout` 字段来表示使用哪个布局进行加载该页面，如：

```diff
module.exports = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "page-index" */'@/pages/Index.vue'),
+   meta: {
+     layout: 'FullWidth',
+   },
  },
];
```

## 为什么不用子路由

本质来说子路由的父层页面就是 Layout 功能，而这里实现的 Layout 更加的清晰，分工也更明确。