<template>
  <div id="app">
    <main>
      <my-title
        :title="title"
      />
      <my-nav
        :nav="nav"
      />
      <my-logo />
    </main>
    <my-footer />
  </div>
</template>

<script>
import MyTitle from '@/components/Title.vue';
import MyNav from '@/components/Nav.vue';
import MyLogo from '@/components/Logo.vue';
import MyFooter from '@/components/Footer.vue';

export default {
  name: 'App',
  data() {
    return {
      title: 'Hello World',
      nav: [
        {
          text: '谷歌',
          url: 'https://www.google.com/',
        },
        {
          text: '下拉菜单',
          child: [
            {
              text: '百度',
              url: 'https://www.baidu.com/',
            },
            {
              text: '阿里淘宝',
              url: 'https://www.taobao.com/',
            },
            {
              text: '腾讯',
              url: 'https://www.qq.com/',
            },
          ],
        },
        {
          text: '@前端小武',
          url: 'https://xuexb.com/',
        },
        {
          text: 'GitHub',
          url: 'https://github.com/xuexb/learn-vue2/',
        },
      ],
    };
  },
  components: {
    MyTitle,
    MyNav,
    MyLogo,
    MyFooter,
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/public";
</style>

<style lang="scss" scoped>
// 吸底样式
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  > main {
    flex: 1 1 auto;
  }
}
</style>
