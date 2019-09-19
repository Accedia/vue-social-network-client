import OuterLayout from '../OuterLayout.vue';
import Posts from '../pages/Posts.vue';
import Auth from '../pages/Auth.vue';
import SingUp from '../pages/Sing-up.vue';
import UserProfile from '../pages/UserProfile.vue';

export default [
  {
    path: '/',
    abstract: true,
    component: OuterLayout,
    meta: {
      authenticated: true,
    },
    children: [
      {
        path: '',
        name: 'posts',
        component: Posts,
        exact: true,
      },
      {
        path: '/user-profile/:user_id',
        name: 'user-profile',
        component: UserProfile,
        exact: true,
      },
    ],
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
