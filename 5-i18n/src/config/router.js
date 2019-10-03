module.exports = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "page-index" */'@/pages/Index.vue'),
  },
  {
    path: '/view/:id/',
    component: () => import(/* webpackChunkName: "page-view" */'@/pages/view/Index.vue'),
  },
  {
    path: '*',
    component: () => import(/* webpackChunkName: "page-404" */'@/pages/404.vue'),
  },
];
