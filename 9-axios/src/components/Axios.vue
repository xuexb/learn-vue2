<template>
  <div class="axios">
    <p>
      该组件是演示使用 axios 配置化后发送不同“命名空间”的例子，具体请看源码实现。
    </p>
    <div>
      <button @click="send({ type: 'httpbin' })">@httpbin</button>
      <button @click="send({ type: 'httpbin-headers' })">@httpbin-headers</button>
      <button @click="send({ type: 'httpbin-params' })">@httpbin-params</button>
      <button @click="send({ type: 'httpbin-response' })">@httpbin-response</button>
      <button @click="send({ type: 404 })">404</button>
      <button @click="send({ type: 500 })">500</button>
      <button @click="send({ type: 'error' })">错误的链接</button>
      <button @click="send({ type: 'image' })">错误的格式</button>
    </div>
    <div>
      <p v-if="loading">loading...</p>
      <pre v-else-if="msg">{{ msg }}</pre>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Axios',
  data() {
    return {
      loading: false,
      msg: '',
    };
  },
  methods: {
    async send({ type }) {
      const urls = {
        httpbin: '@httpbin/anything',
        'httpbin-headers': '@httpbin-headers/anything',
        'httpbin-params': '@httpbin-params/anything',
        'httpbin-response': '@httpbin-response/anything',
        404: '@httpbin/status/404',
        500: '@httpbin/status/500',
        error: 'https://fsdfsdfs',
        image: '@httpbin/image/png',
      };

      this.loading = true;
      const res = await this.$service.get(urls[type]);
      this.msg = JSON.stringify(res, null, 4);
      this.loading = false;
    },
  },
};
</script>

<style scoped lang="scss">
.axios {
  button {
    color: #fff;
    background-color: #007bff;
    border: 1px solid #007bff;
    outline: none;
    border-radius: 4px;
    padding: 0 18px;
    display: inline-block;
    cursor: pointer;
    height: 32px;
    margin-left: 20px;

    &:first-child {
      margin-left: 0;
    }

    &:hover {
      background-color: #0069d9;
      border-color: #0062cc;
    }

    &:active {
      background-color: #0062cc;
      border-color: #005cbf;
    }

    &:focus {
      box-shadow: 0 0 0 2px rgba(38, 143, 255, 0.5);
    }
  }
}
</style>
