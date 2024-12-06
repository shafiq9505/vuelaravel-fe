const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('pages/LoginPage.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('pages/RegisterPage.vue'),
  },
  {
    path: '/main-layout',
    name: 'register',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/home', // Default path when navigating to /main-layout
        name: 'home',
        component: () => import('pages/HomePage.vue'),
      },
      {
        path: '/user', // Default path when navigating to /main-layout
        name: 'user',
        component: () => import('pages/UserProfile.vue'),
      },
      {
        path: '/list-item', // Default path when navigating to /main-layout
        name: 'listItem',
        component: () => import('pages/ListItem.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
