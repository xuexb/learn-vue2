/**
 * @file Vuex 入口
 */

import Vue from 'vue';
import Vuex from 'vuex';
import message from './modules/message';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    message,
  },
});
