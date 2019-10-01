<template>
  <nav class="c-page-width nav">
    <ul class="nav-list">
      <li v-for="(item, index) in nav" :key="index">
        <template v-if="item.child && item.child.length">
          <span class="nav-list-text">{{ item.text }}</span>
          <ul class="nav-list-dropdowns">
            <li v-for="(item2, index2) in item.child" :key="index2">
              <a :href="item2.url">{{ item2.text }}</a>
            </li>
          </ul>
        </template>
        <template v-else>
          <a :href="item.url" class="nav-list-text">{{ item.text }}</a>
        </template>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Title',
  props: {
    nav: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
@keyframes nav-show {
  0% {
    transform: translateY(-10px);
    opacity: 0;
  }

  90% {
    opacity: 1;
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.nav {
  height: 48px;
  background-color: #1b2945;

  &-list {
    display: flex;
    list-style: none;

    > li {
      position: relative;
      margin-left: 24px;
    }

    &-text {
      line-height: 48px;
      font-size: 14px;
      color: #aeb9d8;
      text-decoration: none;
      transition: color 0.3s;

      &:hover {
        color: #fff;
      }
    }

    span.nav-list-text {
      cursor: default;
    }

    &-dropdowns {
      display: none;
      position: absolute;
      left: -24px;
      top: 44px;
      width: 200px;
      background-color: #fff;
      box-shadow: 0 0 20px 0 rgba(28, 36, 44, 0.12);
      border-radius: 2px;
      padding: 4px 0;

      a {
        display: block;
        transition: color 0.3s, background-color 0.3s;
        line-height: 48px;
        height: 48px;
        padding: 0 10px;
        text-decoration: none;
        font-size: 13px;
        color: $page-main-color;

        &:hover {
          background-color: rgba(242, 246, 250, 0.7);
          color: #357ce1;
        }
      }
    }

    > li:hover .nav-list-dropdowns {
      display: block;
      animation: nav-show 0.3s forwards ease-out;
    }
  }
}
</style>
