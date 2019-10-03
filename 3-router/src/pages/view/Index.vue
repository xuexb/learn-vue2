<template>
  <div class="view">
    <h2>我是详情页</h2>
    <p>
      这里是 ID={{ $route.params.id }} 的详情内容页，<router-link to="/">点击这里返回首页</router-link> 。
    </p>
  </div>
</template>

<style lang="scss" scoped>
.view {
  padding: 20px 0;

  h2 {
    font-size: 16px;
    padding-bottom: 20px;
  }
}
</style>
