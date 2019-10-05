<template>
  <div class="title">
    <h1>
      <router-link to="/">{{ title }}</router-link>
    </h1>
    <p class="pb10">
      当前全局的 $store.state.user.info 数据为：{{ $store.state.user.info || 'null' }} <br>
      由于只在【详情页】配置了 Preload 数据，需要进入下详情页就加载了全局的数据。
    </p>
  </div>
</template>

<script>
export default {
  name: 'Title',
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
.title {
  background-color: #cee;

  h1 {
    text-align: center;
    font-size: 30px;
    height: 60px;
    line-height: 60px;

    a {
      color: $page-main-color;
      font-weight: 400;
      text-decoration: none;
    }
  }
}
</style>
