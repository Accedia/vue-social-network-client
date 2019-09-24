import Vue from 'vue';
import router from './routes/router';
import store from './store';
import vuetify from './plugins/vuetify';
import './plugins/vee-validate';
import App from './App.vue';

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App),
}).$mount('#app');
