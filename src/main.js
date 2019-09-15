import Vue from 'vue';
import './plugins/vee-validate';
import router from './routes/router';
import vuetify from './plugins/vuetify';
import store from './store';
import App from './App.vue';

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App),
}).$mount('#app');
