/**
 * @file 留言模块
 */

import {
  getAll as getAllMessage,
  del as delMessage,
  add as addMessage,
} from '@/utils/message';

const state = {
  list: getAllMessage(),
};

const getters = {
};

const mutations = {
  ADD_MESSAGE(state, data) {
    state.list.unshift(data);
  },
  DEL_MESSAGE(state, { id }) {
    const index = state.list.findIndex(item => item.id === id);

    if (index > -1) {
      state.list.splice(index, 1);
    }
  },
};

const actions = {
  ADD({ commit }, { message }) {
    const id = Date.now();

    // 更新 Store
    commit('ADD_MESSAGE', { id, message });

    // 更新本地存储
    addMessage({ id, message });
  },

  DEL({ commit }, { id }) {
    // 更新 Store
    commit('DEL_MESSAGE', { id });

    // 更新本地存储
    delMessage({ id });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
