<template>
  <div>
    <form @submit.prevent="submit">
      <textarea
        :placeholder="$t('message.msg')"
        v-model="message"
      ></textarea>
      <div class="pt10">
        <button
          type="submit"
          :disabled="!message"
          :aria-disabled="!message"
        >{{ $t('message.submit') }}</button>
      </div>
    </form>

    <hr>

    <ul>
      <template v-if="list.length">
        <li
          class="item"
          v-for="(item, index) in list"
          :key="index"
          @click="del(item)"
        >
          <p>ID: {{ item.id }}</p>
          <p>{{ $t('message.content') }}: {{ item.message }}</p>
          <span>{{ $t('message.del') }}</span>
        </li>
      </template>
      <li
        class="nodata"
        v-else
      >{{ $t('message.empty') }}</li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      message: '',
    };
  },

  computed: {
    ...mapState({
      list: state => state.message.list,
    }),
  },

  methods: {
    submit() {
      this.$store.dispatch('message/ADD', { message: this.message });
      this.message = '';
    },

    del({ id }) {
      this.$store.dispatch('message/DEL', { id });
    },
  },
};
</script>

<style lang="scss" scoped>
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  outline: none;
  padding: 8px;
  font-size: 14px;
  line-height: 30px;
  height: 200px;
  box-sizing: border-box;

  &:focus {
    border-color: #09f;
  }
}

button[type="submit"] {
  display: block;
  outline: none;
  width: 100%;
  height: 60px;
  background-color: #007bff;
  color: #fff;
  font-size: 16px;
  border-radius: 3px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0069d9;
  }

  &[disabled],
  &[disabled]:hover {
    opacity: 0.65;
    cursor: default;
  }
}

.item {
  padding: 10px 2px;
  border-top: 1px solid #ccc;

  &:hover {
    background-color: rgba(242, 246, 250, 0.7);
  }

  p {
    margin-bottom: 0;
  }

  span {
    display: inline-block;
    padding-top: 10px;
    color: #999;
    font-size: 12px;
  }

  &:first-child {
    border-top: none;
  }
}

.nodata {
  text-align: center;
  height: 100px;
  line-height: 100px;
  color: #999;
}
</style>
