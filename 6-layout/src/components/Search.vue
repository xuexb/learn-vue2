<template>
  <header class="search-header">
    <label>
      <span class="mr10">搜索页是私有的头部</span>
      <input type="text" class="search-header-input">
    </label>
  </header>
</template>

<script>
export default {
  name: 'Search',
};
</script>

<style lang="scss" scoped>
.search-header {
  height: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #cee;

  &-input {
    display: inline-block;
    width: 400px;
    height: 30px;
    border-radius: 3px;
    outline: none;
    margin-top: 20px;
    border: solid 1px #ccc;
    padding-left: 6px;
    transition: border-color 0.3s;

    &:focus {
      border-color: #739fe2;
    }
  }
}
</style>
