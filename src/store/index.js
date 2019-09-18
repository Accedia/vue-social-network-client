import Vue from 'vue';
import Vuex from 'vuex';
import auth from './auth';
import posts from './posts';

Vue.use(Vuex);

const strict = true;

export default new Vuex.Store({
  modules: {
    auth,
    posts,
  },
  strict,
});
