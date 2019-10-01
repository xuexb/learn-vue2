<template>
  <div class="title c-page-width">
    <h1>{{ title }}</h1>
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
  }
}
</style>
