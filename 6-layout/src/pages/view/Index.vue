<template>
  <div class="view">
    <h2>{{ $t('view.title') }}</h2>
    <p>
      {{ $t('view.text', { id: $route.params.id }) }}
      <router-link to="/">{{ $t('view.link') }}</router-link> 。
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
