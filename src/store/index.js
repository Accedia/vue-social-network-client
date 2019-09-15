import Vue from 'vue';
import Vuex from 'vuex';
import auth from './auth';

Vue.use(Vuex);

const strict = true;

export default new Vuex.Store({
  modules: {
    auth,
  },
  strict,
});
