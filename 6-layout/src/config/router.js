module.exports = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "page-index" */'@/pages/Index.vue'),
    meta: {
      layout: 'FullWidthSearch',
    },
  },
  {
    path: '/view/:id/',
    component: () => import(/* webpackChunkName: "page-view" */'@/pages/view/Index.vue'),
    meta: {
      layout: 'FullWidthSearch',
      fullWidth: false, // 关闭全屏宽度
    },
  },
  {
    path: '*',
    component: () => import(/* webpackChunkName: "page-404" */'@/pages/404.vue'),
  },
];
