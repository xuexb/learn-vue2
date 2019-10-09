module.exports = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "page-index" */'@/pages/Index.vue'),
    meta: {
      layout: 'FullWidth',
      title: 'index.title',
      keywords: 'index.keywords',
      description: 'index.description',
    },
  },
  {
    path: '/view/:id/',
    component: () => import(/* webpackChunkName: "page-view" */'@/pages/view/Index.vue'),
    meta: {
      title: 'view.title',
      keywords: 'view.keywords',
      description: 'view.description',
      preload: 'userinfo',
    },
  },
  {
    path: '*',
    component: () => import(/* webpackChunkName: "page-404" */'@/pages/404.vue'),
  },
];
