<template>
  <div class="index">
    <h2>{{ $t('index.title') }}</h2>
    <my-message class="mt20 mb20 pl10 pr10" />
    <ul>
      <li
        v-for="(id, index) in 100"
        :key="index"
      >
        <router-link :to="`/view/${id}/`">
          {{ $t('index.item', { id }) }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import MyMessage from '@/components/Message.vue';

export default {
  components: {
    MyMessage,
  },
};
</script>

<style lang="scss" scoped>
.index {
  padding: 20px 0;

  h2 {
    font-size: 16px;
  }

  ul {
    padding-top: 20px;
    font-size: 14px;
    line-height: 30px;
  }

  a {
    display: block;
    text-decoration: none;

    &:hover {
      background-color: rgba(242, 246, 250, 0.7);
      color: #357ce1;
    }
  }
}
</style>
