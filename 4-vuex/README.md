# 使用 Vuex

本示例是使用 [Vuex](https://vuex.vuejs.org) 完成 Veu.js 页面留言板功能。

## 目录规范

```
src
├── components
│   └── Message.vue                 - 留言板组件
├── store                           - Vuex Store 目录
│   ├── index.js                    - Vuex 入口文件
│   └── modules                     - 数据模块目录
│       └── message.js              - 消息模块
└── utils                           - 方法库
    └── message.js                  - 消息本地化处理方法
```

## 使用

- 以模块存放在数据模块目录，并且使用 Vuex 的命名空间功能（`namespaced: true`），这样在当前模块调用时可以直接使用名称，跨模块调用时添加命名空间，比如方便
- 数据文件中的 `getters` 、 `mutations` 、`actions` 名称都使用常量全大写方式
- 合理的使用 `mapState` 、`mapActions`