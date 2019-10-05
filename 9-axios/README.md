# 接入 axios

## 封装 Service

不直接引用 axios 发送请求，而是统一调用 `service.js` ，在 Service 层里会做很多事。

```js
const service = axios.create({
  timeout: 10000,
  headers: {
      post: {
          'Content-Type': 'application/json;charset=UTF-8',
      },
  },
  emulateJSON: true,
  withCredentials: true,
});
```

使用 `axios.create` 创建一个实例，并且配置一些 JSON 、超时、跨域之类的属性。

## 国际化

统一使用 `service.interceptors.request.use` 拦截，并注入国际化标识，比如 `request.headers['Accept-Language']` 或者 `request.params.lang` 等。


## URI 统一化

经过以上处理后整个 Service 整个都纵享丝滑，但项目应用时发现：

1. 针对某些接口处理事情时比较繁琐，需要不断的向拦截层添加代码
2. 接口链接更换时，很依赖全局查找

针对以上的痛点，我们添加了 URI 前缀统一化，处理逻辑是添加一层配置层，把 URI 的前缀使用统一字符替换，如：`@a/` 、`@b/` 这些分别代表不同的接口方，而在使用时可以直接使用这些标识去请求， Service 层会统一处理替换，配置如：

```js
export const api = {
  '@a/': {
    url: 'https://www.demo.com/api/a/',
    // 自定义统一 headers
    headers(config) {
        return {
        };
    },

    // 自定义统一参数
    params(config) {
        return {
        };
    },

    // 自定义统一返回值
    response(config, response) {},
  },
};
```

结合 `service.interceptors.request.use` 处理后在使用时只需要 `service.get('@a/user/mm');` 即可，甚至配置里还可以根据当前的环境进行分发到不同的接口中，萌萌哒~

## 规范化后端数据结构

在 `service.interceptors.response.use` 里统一后端返回结构，比如最终会序列化成：

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

对于前端服务而言，我们认为不应该出现报错到控制台，而应该更友好的展示出来，甚至于把错误信息上报到监控中心，在 Service 对外暴露方法时，统一在 `service.interceptors.response.use` 拦截器里处理错误，如

```js
// 规范化响应处理
service.instance.interceptors.response.use((res) => {
  const data = res.request && res.config ? res.data : res;

  // 错误时
  if (typeof data !== 'object') {
      return service.error;
  }

  // 各端 Response Schema 兼容代码

  return data;
}, () => Promise.resolve(service.error));
```

这样在业务层就可以直接使用数据判断，而不用再 `try` 或者 `.catch` 处理，如：

```js
const res = await service.get(uri);

// 绝对是成功
if (res.success) {

} else {
    alert(res.message);
}
```