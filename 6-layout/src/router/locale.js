/**
 * @file 路由中语言处理-导航守卫
 */

import {
  getCookieLanguage,
  getBrowserLanguage,
  isSupport,
  find,
  setAsyncLocale,
} from '@/locales/';
import { locale } from '@/config/site';

export default [
  // 语言兼容大小写
  ({ path, query, hash }, from, next) => {
    const lang = path.split('/')[1];

    if (!isSupport(lang) && find(lang)) {
      return next({
        path: `/${find(lang)}/${path.split('/').slice(2).join('/') || ''}`,
        query,
        hash,

        // 这里使用 repalce 是因为识别了老版本的语言（大写）
        // 那么应该让浏览器直接 replace ，不让用户再返回错误的链接
        replace: true,
      });
    }

    return next();
  },

  // 识别语言
  ({ path, query, hash }, from, next) => {
    let lang = path.split('/')[1];

    // 如果连接中没有语言，则使用 cookie.lang > browser > default
    if (!isSupport(lang)) {
      if (isSupport(getCookieLanguage())) {
        lang = getCookieLanguage();
      } else {
        lang = getBrowserLanguage() || locale;
      }

      return next({
        path: `/${lang}/${path.replace(/^\/+/g, '')}`,
        query,
        hash,

        // 这里不能用 replace 是因为有的跳转路径是 /login 这种
        // 如果 replace 那么上面的跳转路径就不会产生历史记录
        // 这样会触发个问题，就是直接访问 / 时，会产生一条多余的历史记录，因为不确定是直接输入，还是 href="/"
        // replace: true,
      });
    }

    // 设置语言
    setAsyncLocale(lang || locale);

    return next();
  },
];
