/**
 * @file vuex 入口
 */

import Vue from 'vue';
import Vuex from 'vuex';
import message from './modules/message';
import user from './modules/user';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    message,
  },
});
