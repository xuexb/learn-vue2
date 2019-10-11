/**
 * axios 接口相关配置
 */

/**
 * 接口配置
 *
 * @type {Object}
 */
export const config = {
  '@httpbin/': 'https://httpbin.org/',

  '@httpbin-headers/': {
    url: 'https://httpbin.org/',

    // 自定义统一 headers
    headers(headers) {
      return {
        xxoo: true,
        ...headers,
      };
    },
  },

  '@httpbin-params/': {
    url: 'https://httpbin.org/',

    // 自定义统一参数
    params(params) {
      return {
        xxoo: true,
        ...params,
      };
    },
  },

  '@httpbin-response/': {
    url: 'https://httpbin.org/',

    // 自定义统一返回值
    response() {
      return {
        xxoo: true,
      };
    },
  },
};

/**
 * axios 实例化参数
 *
 * @type {Object}
 */
export const options = {
  timeout: 30000,
  headers: {
    post: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  },
  emulateJSON: true,
};

/**
 * 错误处理方法
 *
 * @param {Object}} err 错误对象
 * @return {Object}
 */
export const error = err => ({
  success: false,
  code: 500,
  message: '访问出错，请稍后重试',
  data: null,
  trace: err.stack ? err.stack : err,
});

/**
 * 格式化响应数据
 *
 * @param {Object} res axios Response Schema: https://github.com/axios/axios#response-schema
 * @return {Object} 返回响应数据结果对象
 */
export const transformResponse = (res) => {
  const data = res.request && res.config ? res.data : res;

  // 如果不是正常 JSON 数据则认为是错误
  if (typeof data !== 'object' || Array.isArray(data)) {
    return error('数据响应格式不正确。');
  }

  // 封装后端 Response Schema
  // 具体需要根据后端而定
  return {
    success: data.success || data.status === 'ok' || data.code === 200 || data.errcode === 0 || !!data,
    data,
    code: data.code,
    message: data.message,
    _source: data, // 透传一个原始字段
  };
};
