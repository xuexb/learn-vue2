# 使用 Vue Router

本示例是使用 [Vue Router](https://router.vuejs.org/) 完成 Vue.js 页面路由功能。

## 目录规范

```
src
├── components                      - 组件目录
│   ├── Footer.vue          
│   └── Title.vue
├── config                          - 配置目录
│   └── router.js                   - 路由配置
├── pages                           - 页面目录
│   ├── 404.vue
│   ├── Index.vue
│   └── view
│       └── Index.vue
└── router                          - 路由逻辑目录
    └── index.js                    - 路由入口文件
```

注意：`*.vue` 文件是以大驼峰命名的。

## 使用

`src/router/index.js` 对外暴露 `install` 方法和 `router` 属性，`install` 是为了剥离和 `Vue` 实例的耦合，方便按需安装，比如后续的单元测试局部安装（`localVue`），`router` 属性方便在非 Vue 文件里调用路由方法。

## 逻辑、配置分离

是指写的路由逻辑，如：初始化路由 Router 、路由中使用导航守卫等功能，该逻辑全部放在 `src/router/` 目录中，而 `src/config/router.js` 中只是写路由的配置，如：

```js
module.exports = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "page-index" */'@/pages/Index.vue'),
  },
  {
    path: '/view/:id/',
    component: () => import(/* webpackChunkName: "page-view" */'@/pages/view/Index.vue'),
  },
  {
    path: '*',
    component: () => import(/* webpackChunkName: "page-404" */'@/pages/404.vue'),
  },
];
```

注意：

1. 使用 `import` 可实现单路由异步动态加载
2. 使用 `webpackChunkName` 可实现 chunk 文件自定义名称
3. 一定要在最好添加一个 `path: '*'` 的 404 路由

逻辑、配置分离可使我们在后续路由功能上实现的非常漂亮。

## components 和 pages 的区别

- `src/pages/` 目录是“页面”目录，主要跟路由配置一一对应，如：
    - `/` -> `/src/pages/Index.vue`
    - `/uri/path/` -> `/src/pages/uri/path/Index.vue`
    - `/uri/path/b/` -> `/src/pages/uri/path/b/Index.vue` 或 `/src/pages/uri/path/B.vue`
- `src/components/` 目录是组件目录，通常情况下组件是在页面中引用