import Vue from 'vue';
import Router from 'vue-router';
import routes from './routes';
import authGuard from './auth-guard';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes,
});
router.beforeEach(authGuard);

export default router;
