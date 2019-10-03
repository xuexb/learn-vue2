# 使用 Vue I18n

i18n 也就是俗说的国际化，而国际化是需要语言化支持的，并且网站支持的语种越多，语言包会越大。本示例将使用 [Vue I18n](https://kazupon.github.io/vue-i18n/) 结合 Vue.js + Vue Router + Vuex 来实现**异步加载语言包**的例子。

## 目录规范

```
src
├── components
│   └── Locale.vue                  - 添加一个切换语言的示例组件
├── config
│   └── site.js                     - 站点配置，添加当前支持的语言列表、当前默认语言
├── locales                         - 国际化目录
│   ├── en-us                       - 英语
│   │   └── index.js                - 全部语言包都在一个 .js 文件
│   ├── index.js                    - 国际化入口
│   └── zh-cn                       - 中文
│       ├── index.js                - 中文下都是以模块为 .json 文件存放
│       ├── index.json
│       ├── locale.json
│       ├── message.json
│       └── view.json
├── router
│   ├── index.js
│   └── locale.js                   - 添加语言处理的路由导航守卫
└── utils
    └── cookie.js                   - 继承 js-cookie 跳转的 Cookie 操作方法
```

## 语言顺序

1. 链接中显式 - 比如复制一个链接直接发给别人打开
2. Cookie - 曾经访问过
3. 浏览器设置 - 尝试从当前支持的语言列表匹配到浏览器设置的首选语言
4. 默认语言 - `src/config/site.js` 中配置

## 语言包

i18n 需要提示以**对象**（`{}`）的数据为国际化数据，并且由于页面组件的灵活、组件交叉引用，语言包不方便做成按页面、按组件异步加载，但由于项目越来越大，语言包原始文件越来越大，我们以语种为粒度做异步加载，也就是说在中文下只加载中文语言包，在英文下只加载英文语言包。

我们遵循 `src/locales/{语种}/` 为该语种的所有国际化语言包，再约定 `src/locales/{语种}/index` 为该语种的异步加载入口。

而语言包内的实现是全部在 `index.js` 中写，还是由 `index.js` 加载不同的 `*.json` 文件，取决于你。但这里强烈推荐使用 `*.json` 存放语言包，因为可以无缝的接入一些翻译平台（当然需要开发一些接入插件，这是后话），如：[Crowdin](http://crowdin.com/) 。

## 语言容错

处理修正大小写等容错。

## 使用

在模板里直接使用 `{{ $t('key) }}` 即可响应式，其他请参考 [Vue I18n](https://kazupon.github.io/vue-i18n/) 语法。

##### 注意：不能直接在 `data() {}` 里使用 `this.$t('key')` ，因为这样写不是响应式，如：

```js
// 错误的
data() {
    return {
        message: this.$t('key'),
    };
},

// 正确的
computed: {
    message(){
        return this.$t('key');
    },
},
```
