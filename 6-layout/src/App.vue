<template>
  <div id="app">
    <component
      v-if="layout"
      :is="layout"
    />
  </div>
</template>

<script>
import DefaultLayout from '@/layouts/Default.vue';
import FullWidthLayout from '@/layouts/FullWidth.vue';

export default {
  components: {
    Default: DefaultLayout,
    FullWidth: FullWidthLayout,
  },

  computed: {
    layout() {
      return this.$route.meta.layout;
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/public";
</style>
