import Vue from 'vue';
import Vuex from 'vuex';

import loadingModule from '@/store/modules/loading.js';
import randomNumberModule from '@/store/modules/randomNumber.js';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    loadingModule,
    randomNumberModule
  }
});
