module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

    // 允许 Vuex 的 state getters 被重复定义
    'no-shadow': [
      'error',
      {
        allow: [
          'state',
          'getters',
        ],
      },
    ],
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
