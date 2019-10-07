<template>
  <div class="layout-full" :class="width">
    <main>
      <search/>
      <my-locale class="mt20" />
      <router-view></router-view>
    </main>
    <my-footer/>
  </div>
</template>

<script>
import Search from '@/components/Search.vue';
import MyLocale from '@/components/Locale.vue';
import MyFooter from '@/components/Footer.vue';

export default {
  name: 'FullWidthSearch',
  components: {
    Search,
    MyLocale,
    MyFooter,
  },
  computed: {
    width() {
      // 不设置 fullWidth, 默认为全屏宽度
      const { fullWidth = true } = this.$route.meta;
      return fullWidth ? '' : 'c-page-width';
    },
  },
};
</script>
<style lang="scss" scoped>
  // 吸底样式
  .layout-full {
    min-height: 100vh;
    display: flex;
    flex-direction: column;

    > main {
      flex: 1 1 auto;
    }
  }
</style>
