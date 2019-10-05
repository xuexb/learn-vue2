<template>
  <div class="layout-full">
    <main>
      <my-title
        :title="title"
      />
      <my-locale class="mt20" />
      <router-view />
    </main>
    <my-footer />
  </div>
</template>

<script>
import MyTitle from '@/components/Title.vue';
import MyLocale from '@/components/Locale.vue';
import MyFooter from '@/components/Footer.vue';

export default {
  name: 'FullWidthLayout',
  data() {
    return {
      title: 'Hello World',
    };
  },
  components: {
    MyTitle,
    MyLocale,
    MyFooter,
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
