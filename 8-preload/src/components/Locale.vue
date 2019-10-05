<template>
  <div class="locale">
    <p>
      <em>{{ $t('locale.text1') }}</em>
      <span
        v-for="(locale, index) in $i18n.locales"
        :class="{ active: $i18n.locale === locale }"
        :key="index"
        @click="onclickAsync(locale)"
      >{{ locale }}</span>
    </p>
    <p>
      <em>{{ $t('locale.text2') }}</em>
      <span
        v-for="(locale, index) in $i18n.locales"
        :class="{ active: $i18n.locale === locale }"
        :key="index"
        @click="onclick(locale)"
      >{{ locale }}</span>
    </p>
  </div>
</template>

<script>
export default {
  methods: {
    onclick(locale) {
      this.$i18n.setLocale({ locale });
    },

    onclickAsync(locale) {
      this.$i18n.setLocale({ locale, redirect: false });
    },
  },
};
</script>

<style scoped lang="scss">
.locale {
  span {
    line-height: 20px;
    display: inline-block;
    margin-right: 10px;
    padding: 0 8px;
    cursor: pointer;

    &:hover,
    &.active {
      background-color: #09f;
      color: #fff;
    }
  }
}
</style>
