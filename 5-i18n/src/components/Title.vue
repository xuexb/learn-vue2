<template>
  <div class="title">
    <h1>
      <router-link to="/">{{ title }}</router-link>
    </h1>
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
