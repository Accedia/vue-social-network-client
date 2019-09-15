import Home from '../pages/Home.vue';
import Auth from '../pages/Auth.vue';

export default [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      authenticated: true,
    },
  },
  {
    path: '/auth',
    name: 'auth',
    component: Auth,
  },
];
