# 使用 Vue Router + Vue Meta 实现 SEO 需求

## 思路

由于项目要考虑搜索引擎优化，也就是 SEO 功能，而本身 Vue.js 是单页面应用，但据说现在的搜索引擎已经可以爬取 JS 渲染的功能了，甚至连 AJAX 请求数据也可以抓取。

那么页面的标题、关键字、描述都是跟路由挂勾，并且考虑到国际化的问题，我们使用 [Vue Meta](https://github.com/nuxt/vue-meta) 插件来完成 SEO TDK 的设置，结合 Vue I18n 来完成国际化，我们把这个配置放到路由配置中 `src/config/router.js` 中去，字段分别为：

- `meta.title` 页面标题
- `meta.keywords` 页面关键字
- `meta.description` 页面描述

并且可以配置为语言包的 key ，这样就解决了国际化问题。整个 TDK 输出是在 `src/App.vue` 中完成。

## 特点

1. 注入 `<html data-layout="Layout 名称">` 方便全局布局覆盖
2. 注入 `<html lang="语言-地区">`
3. 多语言时添加 `<link rel="alternate" hreflang="zh-CN" href="https://xuexb.com/zh-cn/">` 支持语言列表让搜索引擎更友好，需要配置 `src/config/site.js` 中 `url` 字段
4. 多语言时添加 `<link rel="alternate" hreflang="x-default" href="https://xuexb.com/zh-cn/">` 当前站点默认语言让搜索引擎更友好，需要配置 `src/config/site.js` 中 `url` 字段

## 注意

由于我们配置的语种为全小写，而 `语言-地区` 中地区在页面输出时应该是大写，所以写了个 `src/utils/tools.js` 中 `transformLang` 方法。

- 语言标识参考：<https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes>
- 地区标识参考：<https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2>