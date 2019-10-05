<template>
  <div id="app">
    <component
      v-if="layout"
      :is="layout"
    />
  </div>
</template>

<script>
import { locales, locale, url as siteurl } from '@/config/site';
import { transformLang } from '@/utils/tools';
import { replace } from '@/locales/';
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

  metaInfo() {
    const info = {
      htmlAttrs: {
        lang: transformLang(this.$i18n.locale),
        'data-layout': this.layout,
      },
      meta: [],
    };

    // SEO TDK
    if (this.$route.meta.title) {
      info.title = this.$t(this.$route.meta.title);
    }
    if (this.$route.meta.keywords) {
      info.meta.push({
        vmid: 'keywords',
        name: 'keywords',
        content: this.$t(this.$route.meta.keywords),
      });
    }
    if (this.$route.meta.description) {
      info.meta.push({
        vmid: 'description',
        name: 'description',
        content: this.$t(this.$route.meta.description),
      });
    }

    // 多语言时添加 <link>
    if (locales.length > 1) {
      const url = `${window.location.pathname}${window.location.search}`;
      info.link = locales.map(lang => ({
        rel: 'alternate',
        hreflang: transformLang(lang),
        href: siteurl + replace(url, lang),
      }));

      // 注入默认语言
      info.link.push({
        ref: 'alternate',
        hreflang: 'x-default',
        href: siteurl + replace(url, locale),
      });
    }

    return info;
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/public";
</style>
