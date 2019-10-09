module.exports = {
  productionSourceMap: false,
  pluginOptions: {
    lintStyleOnBuild: true,
    stylelint: {
      fix: true,
    },
  },
  css: {
    loaderOptions: {
      // 引入通用变量
      sass: {
        data: [
          '@import "@/assets/scss/variables.scss";',
          '@import "@/assets/scss/mixins.scss";',
        ].join(''),
      },
    },
  },
};
