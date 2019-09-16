import Home from '../pages/Home.vue';
import Auth from '../pages/Auth.vue';
import SingUp from '../pages/Sing-up.vue';

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
    path: '/sign-in',
    name: 'sign-in',
    component: Auth,
  },
  {
    path: '/sign-up',
    name: 'sign-up',
    component: SingUp,
  },
];
