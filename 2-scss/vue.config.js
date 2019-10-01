module.exports = {
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
