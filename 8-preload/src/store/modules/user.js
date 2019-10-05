/**
 * @file 用户数据模块
 */

import Vue from 'vue';

const state = {
  info: null,
};

const getters = {
};

const mutations = {
  SET_INFO(state, data) {
    Vue.set(state, 'info', data);
  },
};

const actions = {
  PRELOAD_INFO({ commit }) {
    commit('SET_INFO', {
      name: '@前端小武',
      uid: Date.now(),
    });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
