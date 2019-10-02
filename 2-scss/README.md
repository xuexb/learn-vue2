# Vue.js 中使用 Scss 开发样式

其实说使用 Scss 写样式，这不很简单么？还用学习，哈哈哈。我们为了团队整体协作开发，为了更更的效率，我们遵循：

1. 在 `src/assets/scss/` 目录中定义样式，并列出常用的配置：
    - `variables.scss` - 样式变量，通过 `vue.config.js` 中全局加载
    - `mixins.scss` - 全局 Mixins ，通过 `vue.config.js` 中全局加载，注意：该文件只能定义，不能直接输出样式
    - `reset.scss` - 重置样式
    - `layout.scss` - 页面布局，一般用于页面整体的一些设置
    - `common.scss` - 全局常用、通用的一些样式，如：栅格化、常用类等
    - `public.scss` - 样式入口文件，在 `App.vue` 中加载（不使用作用域模式）
2. 所有通用、页面整体、变量全在 `src/assets/scss/*.scss` 中写，页面、组件（ `.vue` 文件）自身单独的样式由各自文件内样式完成，如：`<style lang="scss" scoped>` - 私有作用域模式，不会污染其他组件，如果需要某个选择器不加作用域可以使用 `/deep/ selector {}` 定义样式
3. 统一由 `.browserslistrc` 配置浏览器兼容处理
4. 使用 stylelint 验证样式规范