# Vue.js 项目中使用周边工具介绍

## 常用依赖

- 使用 [Vue.js](https://vuejs.org) 2.x + [Scss](https://sass-lang.com/documentation/syntax#scss) + ES6 开发项目
- [Yarn](https://www.yarnpkg.com/) - 使用 Yarn 管理项目模块依赖
- [Vue CLI](https://cli.vuejs.org/) - 使用 Vue CLI 开发运行、编译打包
- [Babel](https://babeljs.io/) - ES6 转 ES5 浏览器可运行文件，使用 `babel.config.js` 作为配置文件
- [EditorConfig](https://editorconfig.org) - 使用统一格式的 `.editorconfig` 配置文件使各类编辑器表现尽量一致
- [ESLint](https://eslint.org) - 代码格式检查，代码规范，使用 `.eslintrc.js` 作为配置文件
- [Autoprefixer](https://github.com/postcss/autoprefixer) - 使用 Autoprefixer 提供浏览器兼容处理，使用 `.browserslistrc` 作为配置文件
- [Git gitignore](https://git-scm.com/docs/gitignore) - 使用 `.gitignore` 忽略 Git 提交文件
- [Vuex](http://vuex.vuejs.org/) - 使用 Vuex 提供数据驱动
- [Vue Router](https://router.vuejs.org/) - 使用 Vue Router 提供路由功能
- [vue-meta](https://github.com/nuxt/vue-meta) - 使用 Vue Meta 完成页面标题、关键字、描述的设定
- [axios](https://github.com/axios/axios) - 提供接口请求
- [js-cookie](https://github.com/js-cookie/js-cookie) - 操作 Cookie

## 统一命令

```bash
# 安装依赖
yarn install

# 本地开发
yarn dev

# 本地打包构建
yarn build

# 代码规范检查
yarn lint
```
