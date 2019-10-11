# 接入 axios

我们前后端分离项目难免会用到后端接口，而向后端发起一个请求难免后端可能因为不确定因素会出现程序错误，而对于前端开发来说不能因为后端某个程序错误而影响整体的使用（除非非常依赖这个接口），我们通常需要 `try catch` 捕获异常，如：

```js
try {
  const res = await service.get(uri);
  if (res.data) {
    // 成功
  } else {
    // 接口返回错误
  }
} catch (e) {
  // 程序错误
}
```

这样的代码量越大，写的越『复杂』，那么我们本示例通过使用 [axios](https://github.com/axios/axios/) 的拦截器进行代码兼容、配置化等处理。

## 目录结构

```
.
└── src
    ├── config
    │   └── api.js            - 接口相关配置
    └── utils
        └── service.js        - 统一接口接入层
```

## 配置化

我们把一些通用的配置抽离成配置文件 `src/config/api.js` ，暴露属性如下：

- `export const config = {}` - 接口别名配置
- `export const options = {}` - axios 实例化配置
- `export const error = (err) => {}` - 程序出错时统一处理方法，要求返回对象
- `export const transformResponse = (res) => {}` - 后端 Response Schema 转换方法

## 封装 Service

不直接引用 axios 发送请求，而是统一调用 `src/utils/service.js` 服务层，Service 通过实例化参数创建，并对外暴露 Service 属性。还可以挂载到 Vue 实例中去，使用如：

```js
import { Service, get } from '@/utils/service';

export default {
  methods: {
    async vue() {
      const res = await this.$service.get(url);
    },

    async service() {
      const res = await Service.get(url);
    },

    async get() {
      const res = await get(url);
    },
  },
};
```

## 接口别名配置

项目中我们可能会遇到：

1. 针对某些接口处理事情时比较繁琐，需要不断的向拦截层添加代码
2. 接口链接更换时，很依赖全局查找
3. 不方便针对某一类接口统一处理

针对以上痛点，我们把接口『分类』，并在请求时使用别名方式，如：`@ip138` 、`@google` 、`@baidu` 等标识作为前缀，在配置里如：

```js
/**
 * 接口配置
 *
 * @type {Object}
 */
export const config = {
  '@httpbin/': 'https://httpbin.org/',

  '@httpbin-222/': {
    url: 'https://httpbin.org/',

    // 自定义统一 headers
    headers(headers, config) {
      return {
        xxoo: true,
        ...headers,
      };
    },

    // 自定义统一参数
    params(params, config) {
      return {
        xxoo: true,
        ...params,
      };
    },

    // 自定义统一返回值
    response(res, response) {
      return {
        xxoo: true,
      };
    },
  },
};
```

通过以上配置，我们就可以直接使用，如：

- `Service.get('@httpbin/status/200')` - 只是替换请求地址为 `https://httpbin.org/status/200`
- `Service.get('@httpbin-222/status/200')` - 替换请求地址为 `https://httpbin.org/status/200` ，并且统一处理请求的 Headers 、Params 和返回值


## 国际化

统一使用 `service.interceptors.request.use` 拦截，并注入国际化标识，比如 `request.headers['Accept-Language']` 或者 `request.params.lang` 等。

## 规范化后端数据结构

使用 `transformResponse` 统一后端返回结构，比如最终会序列化成：

```js
{
  success: Boolean,
  code: Number,
  message: String,
  data: Any,
}
```

这样好处是说业务层不需要关心各个服务端返回的是否正确，而规范化后端数据时，需要跟各个服务端沟通好返回的字段标识，以方便来转成规范化结构，比如A端认为 `code === 200` 才是成功，B端认为 `code=0` 才是成功。

## 接口容错

对于前端服务而言，我们认为不应该出现报错到控制台，而应该更友好的展示出来，甚至于把错误信息上报到监控中心，在 Service 里结合 `error` 配置，在程序出错时统一调用该方法响应一个缺省的错误对象，如：

```js
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
```

这样在业务层就可以直接使用数据判断，而不用再 `try` 或者 `.catch` 处理，如：

```js
const res = await service.get(uri);

// 绝对是成功
if (res.success) {
  // 成功
} else {
  // 错误
}
```

## 注意

### 1. 接口容错+规范化需要后端处理吗？

首先需要约定好哪些算成功，哪些算失败，比如：

- 请求列表数据成功并且有数据 - `{ success: true, data: [{}, {}] }`
- 请求列表数据成功，但没有数据 - `{ success: true, data: [] }`
- 请求出错 - `{ success: false, message: '' }`
- 提交数据成功 - `{ success: true, data: 1 }`
- 提交数据失败 - `{ success: false, message: '' }`

如果依赖接口各端规则不同，那么需要使用 `transformResponse` 方法来兼容所有处理，以达到前端所需要的格式

### 2. 我可以使用 Node.js 代理吗？

其实这里不关注你使用什么代理，这里只是做一个请求链接的映射、错误的处理，至于你是直接 CORS 跨域请求，还是使用 Nginx Proxy 请求 `/-/api/user/info` 其实都一样。

### 3. `transformResponse` 和配置里的 `response` 什么关系呢？

首先接口成功后会先使用 `transformResponse` 进行格式转化，并进行链接别名匹配中的 `response` 方法，最终接口返回值以 `response` 方法返回值为准。

### 4. 程序错误是指什么？

程序错误如：

- 后端服务端错误
- 接口非正常状态码响应，如：404 、301
- 接口响应格式错误，如：图片、解析 JSON 失败

程序错误时将使用 `src/config/api.js` 的 `error` 方法统一处理。