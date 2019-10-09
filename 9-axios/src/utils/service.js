/* eslint-disable no-param-reassign */
import axios from 'axios';
import { transformLang } from '@/utils/tools';
import { i18n } from '@/locales/';
import {
  config as api,
  options,
  transformResponse,
  error,
} from '@/config/api';

// axios 实例
const Service = axios.create(options);

/**
 * 匹配接口配置
 *
 * @param {string} url 请求链接
 * @return {(null|Object)}
 */
const match = (url) => {
  let result = null;

  Object.keys(api).some((key) => {
    if (url.indexOf(key) === 0) {
      result = typeof api[key] === 'string'
        ? { url: api[key], key }
        : { ...api[key], key };

      return true;
    }

    return false;
  });

  return result;
};

/**
 * 合并对象
 *
 * @param {Object} target 目标数据
 * @param {Object} data 原始数据
 * @param {Object} args 方法参数
 * @return {Object}
 */
const mergeObject = (target, data, args) => {
  if (typeof target === 'undefined') {
    return { ...data };
  }

  if (typeof target === 'object') {
    return {
      ...target,
      ...data,
    };
  }

  if (typeof target === 'function') {
    return target(data, args);
  }

  return {};
};

// 请求拦截器
Service.interceptors.request.use((config) => {
  const matched = match(config.url);

  // 添加国际化
  config.headers = {
    'Accept-Language': transformLang(i18n.locale),
    ...config.headers,
  };

  if (matched) {
    // 处理链接替换，保留一个原始链接别名
    config.urlalias = config.url;
    config.url = config.url.replace(matched.key, matched.url);

    // 处理 headers
    config.headers = mergeObject(matched.headers, config.headers, config);

    // 处理 params
    config.params = mergeObject(matched.params, config.params, config);
  }

  return config;
}, err => error(err));

// 响应拦截器
Service.interceptors.response.use((res) => {
  const data = transformResponse(res);
  const matched = res && res.config && res.config.urlalias ? match(res.config.urlalias) : null;

  if (matched && typeof matched.response === 'function') {
    return matched.response(data, res);
  }

  return data;
}, err => error(err));

/**
 * POST 请求
 *
 * @param  {...any} args 请求参数
 * @return {Promise}
 */
const post = (...args) => Service.post(...args);

/**
 * GET 请求
 *
 * @param  {...any} args 请求参数
 * @return {Promise}
 */
const get = (...args) => Service.get(...args);

/**
 * 安装到组件实例中
 *
 * @param {Object} Vue 实例
 */
const install = (Vue) => {
  Vue.prototype.$service = Service;
};

export {
  Service,
  install,
  post,
  get,
};
